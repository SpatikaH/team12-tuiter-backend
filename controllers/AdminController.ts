/**
 * @file Controller RESTful Web service API for admin resource
 */
import AdminDao from "../daos/AdminDao";
import User from "../models/users/User";
import {Express, Request, Response} from "express";
import AdminControllerI from "../interfaces/AdminControllerI";
import Tuit from "../models/tuits/Tuit";

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
            app.post("/admin/api/users",
                AdminController.adminController.createUser);
            app.delete("/admin/api/users/:uid",
                AdminController.adminController.deleteUser);
            app.get("/admin/api/tuits",
                AdminController.adminController.findAllTuits);
            app.put("/admin/api/users/:userid", 
                AdminController.adminController.updateUser);
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

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
     createUser = (req: Request, res: Response) =>
        AdminController.adminDao.createUser(req.body)
            .then((user: User) => res.json(user));


    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
     deleteUser = (req: Request, res: Response) =>
        AdminController.adminDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));

    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        AdminController.adminDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    
    /** Modifies an existing user instance
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be modified
    * @param {Response} res Represents response to client, including status
    * on whether updating a user was successful or not
    */
     updateUser = (req: Request, res: Response) =>
        AdminController.adminDao.updateUser(req.params.userid, req.body)
         .then(status => res.json(status));
};