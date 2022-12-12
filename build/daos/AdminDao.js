"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../mongoose/users/UserModel"));
const TuitModel_1 = __importDefault(require("../mongoose/tuits/TuitModel"));
/**
 * @class AdminDao Implements Data Access Object managing data storage
 * of Admins
 * @property {AdminDao} adminDao Private single instance of UserDao
 */
class AdminDao {
    constructor() {
        /**
         * Updates user with new values in database
         * @param {string} uid Primary key of user to be modified
         * @param {User} user User object containing properties and their new values
         * @returns Promise To be notified when user is updated in the database
         */
        this.blockUser = (uid, user) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
        /**
         * Updates user with new values in database
         * @param {string} uid Primary key of user to be modified
         * @param {User} user User object containing properties and their new values
         * @returns Promise To be notified when user is updated in the database
         */
        this.unblockUser = (uid, user) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
        /**
         * Uses UserModel to retrieve all user documents from users collection
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.find().exec(); });
        /**
         * Uses UserModel to retrieve single user document from users collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findOne({ username }); });
        /**
         * Inserts user instance into the database
         * @param {User} user Instance to be inserted into the database
         * @returns Promise To be notified when user is inserted into the database
         */
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.create(user); });
        /**
         * Removes user from the database.
         * @param {string} uid Primary key of user to be removed
         * @returns Promise To be notified when user is removed from the database
         */
        this.deleteUser = (uid) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteOne({ _id: uid }); });
        /**
         * Uses TuitModel to retrieve all tuit documents from tuits collection
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find().populate("postedBy").exec(); });
        /**
         * Updates user with new values in database
         * @param {string} uid Primary key of user to be modified
         * @param {User} user User object containing properties and their new values
         * @returns Promise To be notified when user is updated in the database
         */
        this.updateUser = (uid, user) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
        /**
         * Updates tuit with new values in database
         * @param {string} tid Primary key of tuit to be modified
         * @param {Tuit} tuit User object containing properties and their new values
         * @returns Promise To be notified when tuit is updated in the database
         */
        this.updateTuit = (tid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
}
exports.default = AdminDao;
AdminDao.adminDao = null;
/**
 * Creates singleton DAO instance
 * @returns AdminDao
 */
AdminDao.getInstance = () => {
    if (AdminDao.adminDao === null) {
        AdminDao.adminDao = new AdminDao();
    }
    return AdminDao.adminDao;
};
;
