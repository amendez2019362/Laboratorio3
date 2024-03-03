import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default : "Angel"
    },
    email: {
        type: String,
        default: "angel@kinal.org.com"
    },
    password: {
        type: String,
        default: "987654"
    },
    status: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function(){
    const { __v, password, _id, status, ...user} = this.toObject();
    user.uid = _id;
    return user
}
export default mongoose.model('User', userSchema);