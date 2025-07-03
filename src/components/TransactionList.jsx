// src/components/TransactionList.jsx
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styles from '../styles/TransactionList.module.css';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  return (
    <div className={styles.listContainer}>
      <h3>Transaction History</h3>
      <ul className={styles.list}>
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className={`${styles.item} ${tx.amount < 0 ? styles.expense : styles.income}`}
          >
            <div className={styles.itemText}>
              <strong>{tx.text}</strong><br />
              <small>{formatDate(tx.date)}</small>
            </div>
            <div className={styles.itemAmount}>
              ₹{tx.amount.toFixed(2)}
              <button
                className={styles.deleteBtn}
                onClick={() => deleteTransaction(tx.id)}
                aria-label={`Delete ${tx.text}`}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
