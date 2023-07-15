import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Edit() {
  const { index } = useParams();
  const navigate = useNavigate();
  
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  useEffect(() => {
    axios.get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [index]);

  const handleInput = (event) => {
    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${API}/transactions/${index}`, transaction)
      .then(() => {
        navigate(`/transactions/${index}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={transaction.date} onChange={handleInput} required />

        <label htmlFor="name">Name:</label>
        <input id="name" value={transaction.name} onChange={handleInput} required />

        <label htmlFor="amount">Amount:</label>
        <input id="amount" type="number" value={transaction.amount} onChange={handleInput} required />
        
        <label htmlFor="from">From:</label>
        <input id="from" value={transaction.from} onChange={handleInput} required />

        <label htmlFor="category">Category:</label>
        <input id="category" value={transaction.category} onChange={handleInput} required />

        <button type="submit">Create New Item</button>
      </form>
    </div>
  );
}

export default Edit;
