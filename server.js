require("dotenv").config();
const exp = require("express");
const app = exp();
const cors = require("cors");
const dbModel = require("./db").model;
const bcrypt = require("bcrypt");

app.use(cors());
app.use(exp.json());

app.get("/", (req, res) => {
  res.json("Just normal auth server");
});

app.post("/register", (req, res) => {
  const user = req.body;
  dbModel
    .create(user)
    .then((doc) => {
      res.status(201).json("usercreated");
    })
    .catch((err) => {
      res.status(200).json(err.message.split(" ").pop());
    });
});

app.post("/login", (req, res) => {
  const user = req.body;

  if (user.email) {
    dbModel.findOne({ email: user.email }).then((doc) => {
      if (doc) {
        bcrypt.compare(user.password, doc.password, function (err, result) {
          if (result) {
            res.status(200).json("userexist");
          } else {
            res.status(200).json("passwordwrong");
          }
        });
      } else {
        res.status(404).json("usernotexist");
      }
    });
  } else {
    res.status(404).json("usernotexist");
  }
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
