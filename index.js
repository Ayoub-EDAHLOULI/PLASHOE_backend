const express = require("express");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const userInfoRouter = require("./routes/userInfoRouter");
const addressRouter = require("./routes/addressRouter");
const cardRouter = require("./routes/cardRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");
const paymentRouter = require("./routes/paymentRouter");

const app = express();
const PORT = process.env.PORT || 3000;
const hostman = process.env.HOSTMAN || "127.0.0.1";
const cors = require("cors");

//Middleware to parse JSON data
app.use(express.json());

//CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.static("public"));

//Routes

//Auth routes
app.use("/api/v1", authRouter);

//User routes
app.use("/api/v1", userRouter);

//Product routes
app.use("/api/v1", productRouter);

//Category routes
app.use("/api/v1", categoryRouter);

//User info routes
app.use("/api/v1", userInfoRouter);

//Address routes
app.use("/api/v1", addressRouter);

//Card routes
app.use("/api/v1", cardRouter);

//Order routes
app.use("/api/v1", orderRouter);

//Review routes
app.use("/api/v1", reviewRouter);

//Payment routes
app.use("/api/v1", paymentRouter);

//Server
app.listen(PORT, hostman, () => {
  console.log(`Server is running on http://${hostman}:${PORT}`);
});
