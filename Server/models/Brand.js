const mongoose = require("mongoose");

const { Schema } = mongoose;

const brandSchema = new Schema({
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
  },
  {timestamps:true}
  );

// to chnage _id to id for frontend
const virtual  = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Brand = mongoose.model("Brand",brandSchema)