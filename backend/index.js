const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDB } = require("./database");
const staticRouter = require("./routes/static.routes");
const userRouter = require("./routes/userroutes"); // Import user routes
const messageRouter = require("./routes/messageroutes");
const conversationRouter = require("./routes/conversationroutes");
const conversationRouter2 = require("./routes/conversation.routes");

// const conversationhistoryRouter = require('./routes/conversationhistoryroutes');

const app = express();

app.use(express.json());
app.use(cors());
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.use("/static", staticRouter);
app.use("/api/conversations", conversationRouter2);
app.use("/api", userRouter); // Add user routes under "/api" prefix
app.use("/api", messageRouter);
app.use("/api", conversationRouter);
// app.use('/api', conversationhistoryRouter);

// 404 Route - Fix the response method to return JSON
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const { connectToDB } = require("./database");
// const staticRouter = require("./routes/static.routes");

// const app = express();

// app.use(express.json());
// app.use(cors());
// connectToDB();

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the API" });
// });

// app.use("/static", staticRouter);

// app.get("/*", (req, res) => {
//   res.status(404).message({ message: "Not Found" });
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
