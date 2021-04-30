const mongoose = require("mongoose");
const isEmail = require("validator").isEmail;
const bcrypt = require("bcrypt");

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGO_DB}@tinderclone.g5v0l.mongodb.net/tindercloneDB?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

const schemaopts = {
  name: { type: String, required: [true, "namenotfound"] },
  email: {
    type: String,
    validate: [isEmail, "notemail"],
    unique: true,
    required: [true, "emailnotfound"],
  },
  password: {
    type: String,
    minlength: [5, "minlength5"],
    required: [true, "passwordrequired"],
  },
  confirmpassword: {
    type: String,
    validate: {
      validator: function (confirmPassword) {
        // console.log(this.password, confirmPassword);
        if (this.password === confirmPassword) return true;
        else {
          return false;
        }
      },
      message: "passwordnotmatching",
    },
    required: [true, "passwordnotmatching"],
  },
};
const dbSchema = new mongoose.Schema(schemaopts);

dbSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 4);
  this.confirmpassword = this.password;
  next();
});

const model = mongoose.model("registerduser", dbSchema);

exports.model = model;
