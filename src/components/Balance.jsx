import React, { useContext, useMemo } from 'react';
import styles from '../styles/Balance.module.css';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const { income, expense, total } = useMemo(() => {
    const amounts = transactions.map((tx) => tx.amount);

    const income = amounts
      .filter((amt) => amt > 0)
      .reduce((acc, amt) => acc + amt, 0);

    const expense = amounts
      .filter((amt) => amt < 0)
      .reduce((acc, amt) => acc + amt, 0);

    const total = income + expense;

    return {
      income: income.toFixed(2),
      expense: Math.abs(expense).toFixed(2),
      total: total.toFixed(2),
    };
  }, [transactions]);

  return (
    <section className={styles.balanceSection} aria-label="Balance overview">
      <h2>Your Balance</h2>
      <h1 className={parseFloat(total) < 0 ? styles.negative : styles.positive}>
        ₹{total}
      </h1>

      <div className={styles.incomeExpense}>
        <div className={styles.income}>
          <h4>Income</h4>
          <p>₹{income}</p>
        </div>
        <div className={styles.expense}>
          <h4>Expense</h4>
          <p>₹{expense}</p>
        </div>
      </div>
    </section>
  );
};

export default Balance;
