import User from "../models/users/User";

export default interface AdminDaoI {
    findAllUsers(): Promise<User[]>;
    blockUser(uid: string, user: User): Promise<User[]>;
    createUser (user: User): Promise<User>;
    deleteUser (uid: string): Promise<any>;
    updateUser (uid: string, user: User): Promise<any>;
};