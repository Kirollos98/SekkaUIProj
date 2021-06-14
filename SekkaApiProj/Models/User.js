const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    password:{
        type:String
    },
    email: {
        type: String

    },
    city: {
        type: String,
    },
    profilePicture: {
        type: String
    }
});
//assign the user schema to User Class
const User = mongoose.model("User", userShema);
User.on("index", (err) => {
    console.log(err);
})
module.exports = User;