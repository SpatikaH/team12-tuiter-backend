/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import AdminModel from "../mongoose/admins/AdminModel";
import Admin from "../models/admins/Admin";
import AdminDaoI from "../interfaces/AdminDaoI";
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";

/**
 * @class AdminDao Implements Data Access Object managing data storage
 * of Admins
 * @property {AdminDao} adminDao Private single instance of UserDao
 */
export default class AdminDao implements AdminDaoI {
    private static adminDao: AdminDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns AdminDao
     */
    public static getInstance = (): AdminDao => {
        if(AdminDao.adminDao === null) {
            AdminDao.adminDao = new AdminDao();
        }
        return AdminDao.adminDao;
    }
    
    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    blockUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid}, 
            {$set: user});

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

};