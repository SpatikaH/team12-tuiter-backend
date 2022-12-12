"use strict";
/**
 * @file Controller RESTful Web Service API for Authentication Resource
 */
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
const AdminDao_1 = __importDefault(require("../daos/AdminDao"));
//Encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @class AuthenticationController implements RESTFUL Web service API for authentication of a user
 * @property {AdminDao} adminDao Singleton DAO implementing authentication operations
 */
class AuthenticationController {
    constructor() { }
    /**
     * Retrieve a user that is stored in the session (i.e. the logged in user)
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client which in this case is possibly a user
     * @returns Returns either a 403 error OR the user that is stored in the cookie (i.e. the logged in user)
     */
    profile(req, res) {
        let profile;
        profile = req.session['profile'];
        //If a session exists then then return the profile so we can display it onscreen!
        if (profile) {
            return res.json(profile);
        }
        else {
            return res.sendStatus(403);
        }
    }
    /**
     * Remove the user from the session (i.e. logout the user)
     * @param req Represents request from client
     * @param res Represents response to client which in this case is just a status of value 200
     * @returns 200 Response Status
     */
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy(() => { });
            //Successfull destruction of session
            return res.sendStatus(200);
        });
    }
    /**
     * Attempt to store the user in the session (i.e. log them in)
     * @param req Represents request from client
     * @param res Represents response to client which in this case is either 403 error or the user who is now stored in the session
     * @returns 403 Response Status OR the user stored in the session
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const username = user.username;
            const password = user.password;
            const existingUser = yield AuthenticationController.adminDao.findUserByUsername(username);
            //If the user doesn't exist then ERROR!
            if (!existingUser) {
                return res.sendStatus(403);
            }
            //Check their password hash!
            const match = yield bcrypt.compare(password, existingUser.password);
            if (match && existingUser.isBlocked === false) {
                //We don't want the user to see their password
                existingUser.password = "*****";
                req.session['profile'] = existingUser;
                return res.json(existingUser);
            }
            else {
                return res.sendStatus(403);
            }
        });
    }
}
exports.default = AuthenticationController;
AuthenticationController.adminDao = AdminDao_1.default.getInstance();
AuthenticationController.authenticationController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service API
 * @returns AuthenticationController
 */
AuthenticationController.getInstance = (app) => {
    if (AuthenticationController.authenticationController === null) {
        AuthenticationController.authenticationController = new AuthenticationController();
    }
    //Our HTTP Requests
    app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
    app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
    app.post("/api/auth/login", AuthenticationController.authenticationController.login);
    return AuthenticationController.authenticationController;
};
