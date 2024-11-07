const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDB } = require("./database");
const staticRouter = require("./routes/static.routes");

const app = express();

app.use(express.json());
app.use(cors());
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.use("/static", staticRouter);

app.get("/*", (req, res) => {
  res.status(404).message({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
