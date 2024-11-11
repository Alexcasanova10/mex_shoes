const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    last_name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String },

    googleId: { type: String, unique: true, sparse: true }, 
    
    isAdmin: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken:{type: String},
    resetPasswordExpires: {type: Date}
  },
  { timestamps: true }
);

//validate password match or not
userSchema.methods.matchPassword = async function (enterPassword) {

  const isMatch = await bcrypt.compare(enterPassword, this.password)
  console.log("Comparando contraseñas:", enterPassword, this.password, isMatch);

  return isMatch;

};

//register passwrod hash and store
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

module.exports = mongoose.model("User", userSchema);
