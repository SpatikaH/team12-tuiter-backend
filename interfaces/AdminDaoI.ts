import Tuit from "../models/tuits/Tuit";
import User from "../models/users/User";

export default interface AdminDaoI {
    findAllUsers(): Promise<User[]>;
    blockUser(uid: string, user: User): Promise<any>;
    unblockUser(uid: string, user: User): Promise<any>;
    createUser (user: User): Promise<User>;
    deleteUser (uid: string): Promise<any>;
    updateUser (uid: string, user: User): Promise<any>;
    findAllTuits (): Promise<Tuit[]>;
    updateTuit (tid: string, tuit: Tuit): Promise<any>;
};