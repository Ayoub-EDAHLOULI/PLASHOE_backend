const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const hostman = process.env.HOSTMAN || "127.0.0.1";

//Middleware to parse JSON data
app.use(express.json());

//Server
app.listen(PORT, hostman, () => {
  console.log(`Server is running on http://${hostman}:${PORT}`);
});
