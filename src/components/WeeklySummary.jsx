import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styles from "../styles/WeeklySummary.module.css";
import {
  Line
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

export default function WeeklySummary({ onClose }) {
  const { transactions } = useContext(GlobalContext);
  const last7Days = getLast7Days();

  const incomeMap = {};
  const expenseMap = {};

  last7Days.forEach(date => {
    incomeMap[date] = 0;
    expenseMap[date] = 0;
  });

  transactions.forEach(tx => {
    const date = tx.date?.split("T")[0];
    if (last7Days.includes(date)) {
      if (tx.amount > 0) incomeMap[date] += tx.amount;
      else expenseMap[date] += Math.abs(tx.amount);
    }
  });

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: "Income",
        data: last7Days.map(date => incomeMap[date]),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: last7Days.map(date => expenseMap[date]),
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalIncome = Object.values(incomeMap).reduce((a, b) => a + b, 0);
  const totalExpense = Object.values(expenseMap).reduce((a, b) => a + b, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>📅 Weekly Summary</h2>
        <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ₹{totalExpense.toFixed(2)}</p>
        <p><strong>Net Balance:</strong> ₹{balance.toFixed(2)}</p>

        <div className={styles.chartWrapper}>
          <Line data={data} options={options} />
        </div>

        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}
