const mongoose = require("mongoose");

let url = `mongodb+srv://admin:${process.env.MONGO_DB}@tinderclone.g5v0l.mongodb.net/tindercloneDB?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err.message, "DB error");
  });

const schema = {
  word: { type: String, unique: true },
  category: String,
  defination: String,
  shortdefination: String,
  examples: String,
  synonyms: String,
};

const schemaInctance = new mongoose.Schema(schema, { timestamps: true });

const Model = mongoose.model("word", schemaInctance);

exports.model = Model;
