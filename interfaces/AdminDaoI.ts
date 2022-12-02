import User from "../models/users/User";

export default interface AdminDaoI {
    findAllUsers(): Promise<User[]>;
};