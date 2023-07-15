import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function ShowDetails() {
  let { index } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  
  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data)
      })
      .catch((error) => console.error('Error:', error));
  }, [index]);

  const deleteTransaction = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate('/transactions');
      })
      .catch((error) => console.error('Error:', error));
  };

  const DateFormat = new Date(transaction.date).toLocaleDateString();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>From</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{DateFormat}</td>
            <td>{transaction.name}</td>
            <td>{transaction.category}</td>
            <td>{transaction.from}</td>
            <td> {transaction.amount}</td>
          </tr>
        </tbody>
      </table>
      
      <button onClick={() => navigate(`/transactions`)}>Back</button>
      <button onClick={() => navigate(`/transactions/${index}/edit`)}>Edit</button>
      <button onClick={deleteTransaction}>Delete</button>
    </div>
  );}

export default ShowDetails;
