const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const loanRoutes = require("./routes/loans");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(cors());

// admin
const users = [{ id: 1, email: "admin@admin.com", password: "admin" }];

// in production env,we'll not be exposing this uri
const dbURI =
  "mongodb+srv://swastik:Swastik_Ojha%40123@cluster0.rrvbb4j.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance 🚀");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to Mongo instance", err.message);
});

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

// login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user.id }, "your-secret-key", {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

app.use("/api", loanRoutes);

// Import the loan and loan type routes
// const loanTypeRoutes = require('./routes/loanTypes');

// Start the server after connecting to MongoDB and adding the dummy data
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
