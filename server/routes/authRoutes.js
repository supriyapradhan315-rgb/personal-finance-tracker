const express = require("express");

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "AUTH ROUTES WORKING",
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "1234"
  ) {
    return res.status(200).json({
      token: "demo-token",
      message: "Login Success",
    });
  }

  return res.status(400).json({
    message: "Invalid Email or Password",
  });
});

// Register
router.post("/register", (req, res) => {
  res.status(200).json({
    message: "Register Disabled",
  });
});

module.exports = router;