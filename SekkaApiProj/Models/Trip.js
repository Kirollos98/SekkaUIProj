const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
//userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
const tripShema = new mongoose.Schema({
    tripNum:{type:String},
    fromId: { type: mongoose.SchemaTypes.ObjectId, ref: 'City' },
    toId: { type: mongoose.SchemaTypes.ObjectId, ref: 'City' },
    date:{type: Date},
    price:{type:Number},
    type:{type:String},
    seat:{type:Number}
   // time:{type:Timestamp}
});
//assign the user schema to User Class
const Trip = mongoose.model("Trip", tripShema);
Trip.on("index", (err) => {
    console.log(err);
})
module.exports = Trip;