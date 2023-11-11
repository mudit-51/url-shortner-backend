const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const corsOptions = {
  origin: "*"
}
app.use(cors());

app.post("/create", cors(corsOptions),(req, res) => {
  console.log(req);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
