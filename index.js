const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const env = require("dotenv").config();

const app = express();
const port = 5000;

const client = new mongodb.MongoClient(process.env.MONGOURL);

const corsOptions = {
  origin: "*",
};

app.use(cors());
app.use(express.json());

app.post("/create", cors(corsOptions), (req, res) => {
  console.log(req.body);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
