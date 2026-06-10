import { useState, useEffect } from "react";
import axios from "axios";
import "./Expenses.css";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // LOAD DATA
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get("http://localhost:5001/api/expenses");
      setExpenses(res.data);
    };

    fetchExpenses();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD + UPDATE
  const addExpense = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5001/api/expenses/${editId}`,
          form
        );

        setExpenses(
          expenses.map((exp) =>
            exp._id === editId ? res.data : exp
          )
        );

        setEditId(null);
      } else {
        const res = await axios.post(
          "http://localhost:5001/api/expenses",
          form
        );

        setExpenses([...expenses, res.data]);
      }

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5001/api/expenses/${id}`);
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  // EDIT START
  const startEdit = (exp) => {
    setEditId(exp._id);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.split("T")[0],
    });
  };

  return (
    <div className="expense-page">
      <h1>💳 Expense Manager</h1>

      {/* FORM */}
      <form className="expense-form" onSubmit={addExpense}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Category</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.title}</td>
              <td>₹{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>
                <button onClick={() => startEdit(exp)}>Edit</button>
                <button onClick={() => deleteExpense(exp._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}