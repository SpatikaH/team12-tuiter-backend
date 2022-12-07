import mongoose, { Schema } from "mongoose";
import User from "../../models/users/User";
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["USER", "ADMIN"], default: "USER"},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"], default: "SINGLE"},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000},
    isAdmin: {type: Boolean, default: false},
    isBlocked: {type: Boolean, default: false},
    blockedBy: {type: Schema.Types.ObjectId, ref: "AdminModel"},
    joinedDate: {type:Date, default: Date.now()}
}, {collection: "users"});

export default UserSchema;