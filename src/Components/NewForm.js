import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function NewForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    from: "",
    category: ""
  });

  const handleInput = (event) => {
    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/transactions`, transaction)
      .then(() => {
        navigate("/transactions");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const categories = ["Food", "Transport", "Rent", "Utilities", "Other"];

  return (
    <div className="container text-start">
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={transaction.date} onChange={handleInput} className="form-control py-3" required />

        <label htmlFor="name">Name:</label>
        <input id="name" value={transaction.name} onChange={handleInput} className="form-control py-3" placeholder="Tranformers Toys" required />

        <label htmlFor="amount">Amount:</label>
        <input id="amount" type="number" value={transaction.amount} onChange={handleInput} className="form-control py-3" required />

        <label htmlFor="from">From:</label>
        <input id="from" value={transaction.from} onChange={handleInput} className="form-control py-3" placeholder="Online Toys Store" required />

        <label htmlFor="category">Category:</label>
        <select id="category" value={transaction.category} onChange={handleInput} className="form-control py-3" required >
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary py-3 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewForm;
