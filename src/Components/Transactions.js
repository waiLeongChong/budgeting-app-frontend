import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
console.log("Here's the API URL");
console.log(API);

function Transactions() {
  // console.log("This run anytime.");
  
  const [transactions, setTransactions] = useState([]);
  // console.log("This only runs on page load.");
  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((e) => console.error("catch", e));
  }, []);

  // const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  // calculate total amount
  let totalAmount = 0;
  if (transactions) {
    totalAmount = transactions.reduce((total, transaction) => total + Number(transaction.amount), 0);
  }

  return (
    <div>
      <div>
        {/* <h2>Bank Account Total: <span>${Math.round(totalAmount)}</span></h2> */}
        <h2>Bank Account Total: <span>${totalAmount.toFixed(2)}</span></h2>
      </div>

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
            {transactions.map((transaction, index) => {
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>

        </table>
      </div>
      
    </div>
  );
}

export default Transactions;
