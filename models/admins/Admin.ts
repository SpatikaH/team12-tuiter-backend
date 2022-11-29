import mongoose from "mongoose";

export default interface Admin {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    isBlocked?: boolean
};