import User from "../models/users/User";

export default interface AdminDaoI {
    findAllUsers(): Promise<User[]>;
    //createUser(user: User): Promise<User>;
    //updateUser(uid: string, user: User): Promise<any>;
    //deleteUser(uid: string): Promise<any>;
    //blockUser(uid: string): Promise<any>;
};