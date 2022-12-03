/**
 * @file Controller RESTful Web service API for admin resource
 */
import AdminDao from "../daos/AdminDao";
import User from "../models/users/User";
import {Express, Request, Response} from "express";
import AdminControllerI from "../interfaces/AdminControllerI";

/**
 * @class AdminController Implements RESTful Web service API for admins resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /admin/api/users to create a new user instance</li>
 *     <li>GET /admin/api/users to retrieve all the user instances</li>
 *     <li>PUT /admin/api/users to modify an individual user instance </li>
 *     <li>DELETE /admin/api/users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {AdminDao} userDao Singleton DAO implementing user CRUD operations
 * @property {AdminController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class AdminController implements AdminControllerI {
    private static adminDao: AdminDao = AdminDao.getInstance();
    private static adminController: AdminController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns AdminController
     */
    public static getInstance = (app: Express): AdminController => {
        if(AdminController.adminController === null) {
            AdminController.adminController = new AdminController();

            // RESTful User Web service API
            app.get("/admin/api/users",
                AdminController.adminController.findAllUsers); 
            app.put("/admin/api/users/:uid/block",
                AdminController.adminController.blockUser); 
        }
        return AdminController.adminController;
    }

    private constructor() {}

    /**
     * Retrieves all users from the database and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        AdminController.adminDao.findAllUsers()
            .then((users: User[]) => res.json(users));
            

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
     blockUser = (req: Request, res: Response) =>
        AdminController.adminDao.blockUser(req.params.uid, req.body)
             .then((status) => res.send(status));
};