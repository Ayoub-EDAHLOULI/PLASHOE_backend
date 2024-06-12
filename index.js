const express = require("express");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;
const hostman = process.env.HOSTMAN || "127.0.0.1";

//Middleware to parse JSON data
app.use(express.json());

//Routes
app.use("/api/v1", userRouter);

//Server
app.listen(PORT, hostman, () => {
  console.log(`Server is running on http://${hostman}:${PORT}`);
});
