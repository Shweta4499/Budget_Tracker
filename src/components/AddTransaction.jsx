import { useState, useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../styles/AddTransaction.module.css";
import CoinInAnim from "../animations/CoinIn.json";
import CoinOutAnim from "../animations/CoinOut.json";
import { toast } from "react-toastify";


export default function AddTransaction() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showCoin, setShowCoin] = useState(false);
  const [coinType, setCoinType] = useState("in");
  const { addTransaction } = useContext(GlobalContext);

  const soundInRef = useRef(null);
  const soundOutRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a description");
      return;
    }

    if (amount === "" || Number(amount) === 0) {
      setError("Amount cannot be zero");
      return;
    }

    const amt = +amount;
    const newTransaction = {
      id: Date.now(),
      text: text.trim(),
      amount: amt,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Trigger animation and sound
    if (amt !== 0) {
      const isIncome = amt > 0;
      setCoinType(isIncome ? "in" : "out");
      setShowCoin(true);

      if (isIncome) {
        soundInRef.current?.play();
        toast.success("💸 Income added successfully!");

      } else {
        soundOutRef.current?.play();
        toast.warn("💰 Expense recorded");

      }

      setTimeout(() => setShowCoin(false), 2000);
    }

    // Reset form
    setText("");
    setAmount("");
    setError("");
  };

  return (
    <>
      {/* Audio */}
      <audio ref={soundInRef} src="/sounds/CashIn.mp3" preload="auto" />
      <audio ref={soundOutRef} src="/sounds/CashOut.mp3" preload="auto" />

      {/* Lottie animation */}
      {showCoin && (
        <div className={styles.coinContainer}>
          <Player
            autoplay
            keepLastFrame
            src={coinType === "in" ? CoinInAnim : CoinOutAnim}
            style={{ height: "250px", width: "250px" }}
          />
        </div>
      )}

      {/* Form */}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label>Description</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Freelance or Groceries"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. -500 or 1000"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!text || amount === ""}
        >
          Add Transaction
        </button>
      </form>
    </>
  );
}
