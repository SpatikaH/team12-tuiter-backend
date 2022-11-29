import mongoose from "mongoose";
import Admin from "../../models/admins/Admin";
const AdminSchema = new mongoose.Schema<Admin>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    isBlocked: {type: Boolean, default: false}
}, {collection: "admins"});

export default AdminSchema;