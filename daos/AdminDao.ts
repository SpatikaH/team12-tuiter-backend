/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import AdminDaoI from "../interfaces/AdminDaoI";
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";

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
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    unblockUser = async (uid: string, user: User): Promise<any> =>
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

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find().populate("postedBy").exec();
        
    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
     updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne({_id: uid},
        {$set: user});

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit User object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});    
};
