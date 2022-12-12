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
/**
 * @file Controller RESTful Web service API for admin resource
 */
const AdminDao_1 = __importDefault(require("../daos/AdminDao"));
//Encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @class AdminController Implements RESTful Web service API for admins resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /admin/api/users to create a new user instance</li>
 *     <li>GET /admin/api/users to retrieve all the user instances</li>
 *     <li>PUT /admin/api/users to modify an individual user instance </li>
 *     <li>DELETE /admin/api/users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {AdminDao} adminDao Singleton DAO implementing admin CRUD operations
 * @property {AdminController} adminController Singleton controller implementing
 * RESTful Web service API
 */
class AdminController {
    constructor() {
        /**
         * Retrieves all users from the database and returns an array of users.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsers = (req, res) => AdminController.adminDao.findAllUsers()
            .then((users) => res.json(users));
        /**
         * Retrieves the user by their primary key
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the user ID
         */
        this.findUserByUsername = (req, res) => AdminController.adminDao.findUserByUsername(req.body).then((user) => res.json(user));
        /**
         * Modifies an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a user was successful or not
         */
        this.blockUser = (req, res) => AdminController.adminDao.blockUser(req.params.uid, req.body)
            .then((status) => res.send(status));
        /**
         * Modifies an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a user was successful or not
         */
        this.unblockUser = (req, res) => AdminController.adminDao.unblockUser(req.params.uid, req.body)
            .then((status) => res.send(status));
        /**
         * Creates a new user instance ASSUMING a user with the same username does not exist
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new user to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new user that was inserted in the
         * database
         */
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const existingUser = yield AdminController.adminDao.findUserByUsername(newUser.username);
            //If the user already exists then say request denied (ERROR: 403)
            if (existingUser) {
                return res.sendStatus(403);
            }
            else {
                //We don't want to save the actual password in the database!!!
                const password = newUser.password;
                const hash = yield bcrypt.hash(password, saltRounds);
                newUser.password = hash;
                //Make our new user
                const insertedUser = yield AdminController.adminDao.createUser(newUser);
                return res.json(insertedUser);
            }
        });
        /**
         * Removes a user instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteUser = (req, res) => AdminController.adminDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => AdminController.adminDao.findAllTuits()
            .then((tuits) => res.json(tuits));
        /** Modifies an existing user instance
        * @param {Request} req Represents request from client, including path
        * parameter uid identifying the primary key of the user to be modified
        * @param {Response} res Represents response to client, including status
        * on whether updating a user was successful or not
        */
        this.updateUser = (req, res) => AdminController.adminDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => {
            AdminController.adminDao.updateTuit(req.params.tid, req.body)
                .then((status) => res.send(status));
        };
    }
}
exports.default = AdminController;
AdminController.adminDao = AdminDao_1.default.getInstance();
AdminController.adminController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @returns AdminController
 */
AdminController.getInstance = (app) => {
    if (AdminController.adminController === null) {
        AdminController.adminController = new AdminController();
        // RESTful User Web service API
        app.get("/admin/api/users", AdminController.adminController.findAllUsers);
        app.post("/admin/api/users", AdminController.adminController.createUser);
        app.put("/admin/api/users/:uid", AdminController.adminController.updateUser);
        app.delete("/admin/api/users/:uid", AdminController.adminController.deleteUser);
        app.put("/admin/api/users/:uid/block", AdminController.adminController.blockUser);
        app.put("/admin/api/users/:uid/unblock", AdminController.adminController.unblockUser);
        app.get("/admin/api/users/", AdminController.adminController.findUserByUsername);
        app.get("/admin/api/tuits", AdminController.adminController.findAllTuits);
        app.put("/admin/api/tuits/:tid", AdminController.adminController.updateTuit);
    }
    return AdminController.adminController;
};
;
