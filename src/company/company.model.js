import mongoose, { Schema } from "mongoose";

const companySchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        require: [true, "Required field"]
    },
    impact:{
        type: String,
        require: [true, "Required field"]
    },
    years:{
        type: Number,
        require: [true, "Required field"]
    },
    category:{
        type: String,
        require: [true, "Required field"]
    },
    status:{
        type: Boolean,
        default: true
    }
});

companySchema.methods.toJSON = function(){
    const { __v, _id, status, ...company } = this.toObject();
    company.uid = _id;
    return company;
}

export default mongoose.model('Company', companySchema);