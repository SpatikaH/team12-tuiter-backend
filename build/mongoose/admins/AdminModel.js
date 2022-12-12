"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the admins collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema_1 = __importDefault(require("./AdminSchema"));
const AdminModel = mongoose_1.default.model("AdminModel", AdminSchema_1.default);
exports.default = AdminModel;
