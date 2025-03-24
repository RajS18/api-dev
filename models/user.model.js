import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minLength: 2,
            maxLength: 30
        },
        email : {
            type: String,
            required: [true, 'Email of the user is required'],
            trim: true,
            unique:true,
            loawecase:true,
            match: ['/\S+@\S+\.\S+/', 'Please fill a valid email address'],
        },
        password: {
            type: String,
            minLength: true,
            required: [true, 'Password is needed.']
        }
    }, {timestamps:true}
);

const User = mongoose.model('User',userSchema);
export default User;
