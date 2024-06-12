const express = require("express");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();
const PORT = process.env.PORT || 3000;
const hostman = process.env.HOSTMAN || "127.0.0.1";

//Middleware to parse JSON data
app.use(express.json());

//Routes

//Auth routes
app.use("/api/v1", authRouter);

//User routes
app.use("/api/v1", userRouter);

//Product routes
app.use("/api/v1", productRouter);

//Category routes
app.use("/api/v1", categoryRouter);

//Server
app.listen(PORT, hostman, () => {
  console.log(`Server is running on http://${hostman}:${PORT}`);
});
