import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../styles/Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(tx => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter(tx => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0) * -1;

  const hasData = income > 0 || expense > 0;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#4caf50", "#e74c3c"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      {hasData ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p className={styles.noData}>No income or expense data yet.</p>
      )}
    </div>
  );
}
