const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8090;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/ch1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const itemRoutes = require("./routes/todos");

app.use("/api/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
