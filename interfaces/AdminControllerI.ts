import {Request, Response} from "express";

export default interface AdminControllerI {
    findAllUsers(req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
};