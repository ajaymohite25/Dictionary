require("dotenv").config();
const express = require("express");
const axios = require("./Controlers/axios").axiosInstance;
const mongoDB = require("./DataBase/mongoDB").model;
const cors = require("cors");
const filerDataApi = require("./Controlers/filterAPI").filerDataApi;
const app = express();

//middlewear setup
app.use(cors());
app.use(express.json());

//GETING ALL SAVED WORDS FROM DB
app.get("/", (req, res, next) => {
  let response = [];
  mongoDB.find({}, { _id: 0, __v: 0 }, (err, allWords) => {
    if (err) {
      next(err);
    } else {
      allWords.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      allWords.forEach((word) => {
        response.push(word);
      });

      res.json(response);
    }
  });
});

//GETING SENT WORD IN RESPONSE FROM API
app.get("/getword/:word", (req, res, next) => {
  const sentWord = req.params.word;

  axios({
    url: `/${sentWord}`,
    method: "get",
  })
    .then((data) => {
      const dbStoreWord = filerDataApi(data, sentWord);

      mongoDB
        .create(dbStoreWord)
        .then((data) => {
          res.json(dbStoreWord);
        })
        .catch((err) => {
          if (err.code === 11000) {
            //duplicate key err
            res.status(200).json(dbStoreWord);
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      // console.log(err.response.status);
      res.status(200).json({ word: "notwordfound" });
    });
});

//DELETING WORD FROM DB
app.delete("/delete/:word", (req, res, next) => {
  const deleteWord = req.params.word;

  mongoDB
    .deleteOne({ word: deleteWord })
    .then((data) => {
      res.status(201).json("Deleted");
    })
    .catch((err) => {
      next(err);
    });
});

//GLOBAL ERROR HANDLING MIDDLEWEAR
app.use((err, req, res, next) => {
  res.json(err.message);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Started");
});
