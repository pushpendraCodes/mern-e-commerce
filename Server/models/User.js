
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type : String},
    email:{type:String ,require:true ,unique:true},
    password:{type:String ,require:true },
    role:{type:String ,require:true,default:"user"},
    addresses:{type:[Schema.Types.Mixed]},
    order:{type:[Schema.Types.Mixed]},
    resetPasswordToken: {type: String, default:''}

},
{timestamps:true}
)

// to chnage _id to id for frontend
const virtual  = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.User = mongoose.model("User",userSchema)