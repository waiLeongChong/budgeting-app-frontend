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
    category: ""
  });

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
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
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then(() => {
        navigate(`/transactions/${index}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const categories = ["Food", "Transport", "Rent", "Utilities", "Other"];

  return (
    <div className="container text-start">
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <div className="mb-3">
          <label htmlFor="date">Date:</label>
          <input id="date" type="date" value={transaction.date} onChange={handleInput} className="form-control py-3" required />
        </div>

        <div className="mb-3">
          <label htmlFor="name">Name:</label>
          <input id="name" value={transaction.name} onChange={handleInput} className="form-control py-3" required />
        </div>

        <div className="mb-3">
          <label htmlFor="amount">Amount:</label>
          <input id="amount" type="number" value={transaction.amount} onChange={handleInput} className="form-control py-3" required />
        </div>

        <div className="mb-3">
          <label htmlFor="from">From:</label>
          <input id="from" value={transaction.from} onChange={handleInput} className="form-control py-3" required />
        </div>

        <div className="mb-3">
          <label htmlFor="category">Category:</label>
          <select id="category" value={transaction.category} onChange={handleInput} className="form-control py-3" required >
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary py-3 mt-4">
          CREATE NEW ITEM
        </button>
      </form>
    </div>
  );
}

export default Edit;
