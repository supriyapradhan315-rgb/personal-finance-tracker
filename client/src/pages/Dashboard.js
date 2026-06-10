import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/expenses"
      );
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>💰 Finance Tracker</h2>

        <ul>
          <li>
            <Link to="/dashboard" className="menu-link">
              🏠 Dashboard
            </Link>
          </li>

          <li>
            <Link to="/expenses" className="menu-link">
              💳 Expenses
            </Link>
          </li>

          <li>
            <Link to="/reports" className="menu-link">
              📊 Reports
            </Link>
          </li>

          <li>
            <Link to="/settings" className="menu-link">
              ⚙️ Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Dashboard</h1>

        <div className="cards">
          <div className="card income">
            <h3>Total Income</h3>
            <h2>₹50,000</h2>
          </div>

          <div className="card expense">
            <h3>Total Expenses</h3>
            <h2>₹{totalExpenses}</h2>
          </div>

          <div className="card balance">
            <h3>Balance</h3>
            <h2>₹{50000 - totalExpenses}</h2>
          </div>
        </div>

        <div className="transactions">
          <h2>Recent Transactions</h2>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.title}</td>
                  <td>{exp.category}</td>
                  <td>₹{exp.amount}</td>
                  <td>
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}