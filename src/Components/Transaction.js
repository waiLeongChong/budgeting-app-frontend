import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  const dateFormat = new Date(transaction.date).toLocaleDateString();
  
  return (
    <tr>
      <td>{dateFormat}</td>
      <td>
        <Link to={`/transactions/${index}`}>{transaction.name}</Link>
      </td>
      <td>{transaction.category}</td>
      <td>{transaction.from}</td>
      <td>
        {transaction.amount > 0 ? (
          <span>${transaction.amount}</span>
        ) : (
          <span>-${Math.abs(transaction.amount)}</span>
        )}
      </td>
    </tr>
  );
}

export default Transaction;
