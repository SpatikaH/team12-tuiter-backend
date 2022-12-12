/**
 * @file Controller RESTful Web Service API for Authentication Resource
 */

import { Express, Request, Response } from "express";
import AdminDao from "../daos/AdminDao";
//Encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @class AuthenticationController implements RESTFUL Web service API for authentication of a user
 * @property {AdminDao} adminDao Singleton DAO implementing authentication operations
 */
export default class AuthenticationController {
    private static adminDao: AdminDao = AdminDao.getInstance();
    private static authenticationController: AuthenticationController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @returns AuthenticationController
     */
    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authenticationController === null){
            AuthenticationController.authenticationController = new AuthenticationController();
        }

        //Our HTTP Requests
        app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
        app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
        app.post("/api/auth/login", AuthenticationController.authenticationController.login);

        return AuthenticationController.authenticationController;
    }

    private constructor() {}

    /**
     * Retrieve a user that is stored in the session (i.e. the logged in user)
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client which in this case is possibly a user
     * @returns Returns either a 403 error OR the user that is stored in the cookie (i.e. the logged in user)
     */
    profile (req: Request, res: Response){
        let profile: any;
        profile = req.session['profile'];
        //If a session exists then then return the profile so we can display it onscreen!
        if (profile) {
            return res.json(profile);
        } else {
            return res.sendStatus(403);
        }
    }

    /**
     * Remove the user from the session (i.e. logout the user)
     * @param req Represents request from client
     * @param res Represents response to client which in this case is just a status of value 200
     * @returns 200 Response Status
     */
    async logout(req: Request, res: Response) {
        req.session.destroy(() => { });
        //Successfull destruction of session
        return res.sendStatus(200);
    }

    /**
     * Attempt to store the user in the session (i.e. log them in)
     * @param req Represents request from client
     * @param res Represents response to client which in this case is either 403 error or the user who is now stored in the session
     * @returns 403 Response Status OR the user stored in the session
     */
    async login(req: Request, res: Response) {

        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await AuthenticationController.adminDao.findUserByUsername(username);

        //If the user doesn't exist then ERROR!
        if (!existingUser) {
            return res.sendStatus(403);
        }

        //Check their password hash!
        const match = await bcrypt.compare(password, existingUser.password);
        if (match && existingUser.isBlocked === false) {
            //We don't want the user to see their password
            existingUser.password = "*****";
            req.session['profile'] = existingUser;
            return res.json(existingUser);
        } else {
            return res.sendStatus(403);
        }
    }
}