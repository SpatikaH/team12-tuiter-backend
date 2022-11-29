/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from "mongoose";
import AdminSchema from "./AdminSchema";
const AdminModel = mongoose.model("AdminModel", AdminSchema);
export default AdminModel;