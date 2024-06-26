const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRouter");
const paymentRoutes = require("./routes/paymentRouter");
const planRoutes = require("./routes/planRouter");
const attendanceRouter = require("./routes/attendenceRouter");
const reportRoutes = require("./routes/reportRouter");
const uploadRoutes = require("./routes/uploadRouter");
const reviewRouter = require("./routes/reviewRouter");
const stripe = require("stripe")(
  "sk_test_51PJx5nSCawkqcSvpc3WnMRqsOX8ZbbTR5WZRGiL5YTfam2DeDjiONfo1DRxdjujmsiMJM5UkfpxvfKLvmjvcSiRD001RHxmnO9"
);

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://fitness-pack-frontend.vercel.app",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONG,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection successful!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/plan", planRoutes);

app.use("/api/attendance", attendanceRouter);

app.use("/api/payment", paymentRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/review", reviewRouter);

// Static images folder
app.use("/Images", express.static("./images"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
