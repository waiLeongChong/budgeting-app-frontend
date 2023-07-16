import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

function ShowDetails() {
  let { index } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, [index]);

  const deleteTransaction = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate("/transactions");
      })
      .catch((error) => console.error("Error:", error));
  };

  const DateFormat = new Date(transaction.date).toLocaleDateString();

  return (
    <Container>
      <Table striped bordered hover>
        <thead className="table-dark">
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
            <td>{transaction.amount}</td>
          </tr>
        </tbody>
      </Table>

      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Button variant="primary" onClick={() => navigate("/transactions")} className="mr-2 px-4 py-2">
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/transactions/${index}/edit`)}
          className="mr-2 px-4 py-2"
        >
          Edit
        </Button>
        <Button variant="primary" onClick={deleteTransaction} className="px-4 py-2">
          Delete
        </Button>
      </div>
    </Container>
  );
}

export default ShowDetails;
