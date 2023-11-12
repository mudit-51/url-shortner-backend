const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const crypto = require("crypto");
const env = require("dotenv").config();

const app = express();
const port = 5000;

const client = new mongodb.MongoClient(process.env.MONGOURL);

const corsOptions = {
  origin: "*",
};

const send_db = async function (url, hash) {
  const hashCollection = await client.db("URLs").collection("Hashes");
  const findRes = await hashCollection.findOne({
    website: url,
  });
  if (findRes) {
    console.log("Hash for given link already exists");
    return 0;
  }
  const newDoc = {
    website: url,
    hash: hash,
  };
  const res = await hashCollection.insertOne(newDoc);
  console.log(`Document inserted with id ${res.insertedId}`);
  return 1;
};

const get_db = async function (hash) {
  const hashCollection = await client.db("URLs").collection("Hashes");
  const findRes = await hashCollection.findOne({
    hash: hash,
  });
  return findRes;
};

const hash_gen = function (length) {
  let base =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  let array = new Uint8Array(length);
  crypto.getRandomValues(array);
  let str = "";
  for (let i = 0; i < array.length; i++) {
    str += base[array[i] % base.length];
  }
  return str;
};

app.use(cors());
app.use(express.json());

app.post("/create", cors(corsOptions), (req, res) => {
  const hash = hash_gen(10)
  send_db(req.body.target_url, hash);
  res.json({url: hash}).status(200).send();
});
app.get("/*", cors(corsOptions), async (req, res) => {
  const req_hash = req.url.trim().substring(1);
  const x = await get_db(req_hash);
  if (x) {
    res.redirect(x.website);
  } else {
    res.redirect("http://localhost:3000/error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
