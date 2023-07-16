import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((e) => console.error("catch", e));
  }, []);

  let totalAmount = 0;
  let color = "";
  if (transactions) {
    totalAmount = transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
    color = totalAmount > 100 ? "text-success" : totalAmount > 0 ? "text-warning" : "text-danger";
  }

  return (
    <Container>
      <div className="my-5">
        <h2>
          Bank Account Total: <span className={color}>${totalAmount.toFixed(2)}</span>
        </h2>
      </div>

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
          {transactions.map((transaction, index) => {
            return (
              <Transaction key={index} transaction={transaction} index={index} />
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Transactions;
