import { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import "./Reports.css";

export default function Reports() {
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

  const data = [];

  expenses.forEach((exp) => {
    const existing = data.find(
      (item) => item.name === exp.category
    );

    if (existing) {
      existing.value += Number(exp.amount);
    } else {
      data.push({
        name: exp.category,
        value: Number(exp.amount),
      });
    }
  });

  return (
    <div className="reports-page">
      <h1>📊 Financial Reports</h1>

      <div className="report-cards">
        <div className="report-card income">
          <h3>Total Income</h3>
          <h2>₹50,000</h2>
        </div>

        <div className="report-card expense">
          <h3>Total Expenses</h3>
          <h2>₹{totalExpenses}</h2>
        </div>

        <div className="report-card balance">
          <h3>Balance</h3>
          <h2>₹{50000 - totalExpenses}</h2>
        </div>
      </div>

      <div className="chart-box">
        <h2>Expenses by Category</h2>

        <PieChart width={500} height={350}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}