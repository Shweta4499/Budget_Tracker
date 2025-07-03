// AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App"; // your main BudgetTracker
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./firebase/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

export default function AppRouter() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <h3>Loading...</h3>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <App /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
