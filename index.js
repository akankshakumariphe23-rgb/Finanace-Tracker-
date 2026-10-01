const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const userRoute = require("./routes/userroute");
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();
const PORT = 8001;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/finance-tracker")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app
  credentials: true,              // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Routes
app.use("/user", userRoute);
app.use("/income",incomeRoutes);
app.use('/expense', expenseRoutes);
app.use('/budget',budgetRoutes);
app.use('/dashboard',dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});