import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Chart from "./components/Chart";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { GlobalProvider } from "./context/GlobalState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeeklySummary from "./components/WeeklySummary";
import "./App.css";

import { auth } from "./firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // if using react-router

export default function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  const [showChart, setShowChart] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [theme, setTheme] = useState("light");
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("isMuted") === "true";
  });

  const toggleSound = () => {
    setIsMuted((prev) => {
      localStorage.setItem("isMuted", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  return (
    <GlobalProvider>
      <div className="app-container">
        <div className="top-controls">
          <div className="top-buttons">

          <button onClick={() => setShowWeeklySummary(true)}>📈 Weekly Summary</button>

            <button onClick={() => setShowChart(!showChart)}>
              {showChart ? "Hide Chart" : "Show Chart"}
            </button>
            <button onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? "Hide History" : "Show History"}
            </button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button onClick={toggleSound}>
              {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
            </button>
            {user && (
        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      )}
          </div>
        </div>

        <Header />
        <Balance />

        <div className="dashboard">
          {showChart && <Chart isMuted={isMuted} />}
          {showHistory && <TransactionList />}
        </div>

        <div
          className={`panel add-panel ${
            showChart && showHistory ? "expand" : "shrink"
          }`}
        >
          <AddTransaction isMuted={isMuted} />
        </div>
      </div>
      {showWeeklySummary && (
  <WeeklySummary onClose={() => setShowWeeklySummary(false)} />
)}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ fontSize: "0.85rem", fontWeight: 500 }}
      />
    </GlobalProvider>
  );
}
