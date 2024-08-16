const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name should be less than 50 characters"],
        minLength: [3, "Name should be greater than 3 characters"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowerCase: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        select: false
    },
    bio: {
        type: String,
        required: [true, "Bio is required"],
        maxLength: [500, "Bio should be less than 500 characters"]
    }
});

userSchema.methods.JwtToken = function() {
    return JWT.sign(
        { id: this._id, email: this.email },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
};

const userModel = mongoose.model("ourUser", userSchema);

module.exports = userModel;
