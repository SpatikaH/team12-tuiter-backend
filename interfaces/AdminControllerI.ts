import {Request, Response} from "express";

export default interface AdminControllerI {
    findAllUsers(req: Request, res: Response): void;
    blockUser(req: Request, res: Response): void;
    unblockUser(req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
    deleteUser (req: Request, res: Response): void;
    findAllTuits (req: Request, res: Response): void;
    updateUser (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
};