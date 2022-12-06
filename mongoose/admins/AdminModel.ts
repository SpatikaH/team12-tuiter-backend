/**
 * @file Implements mongoose model to CRUD
 * documents in the admins collection
 */
import mongoose from "mongoose";
import AdminSchema from "./AdminSchema";
const AdminModel = mongoose.model("AdminModel", AdminSchema);
export default AdminModel;