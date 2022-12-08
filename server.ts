/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import mongoose from "mongoose";

import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import AdminController from './controllers/AdminController';
import AuthenticationController from "./controllers/AuthenticationController";

//SESSION PROCESS
const session = require('express-session');

//If you want to store custom things in Sessions, you need to perform declaration-merging
declare module "express-session" {
    interface SessionData {
        profile: {};
    }
}

//CORS PROCESS
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}));

//Options for our Session
const sess = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}

//Secure Cookies only work with HTTPS
if (process.env.ENV === "PRODUCTION") {
    app.set('trust proxy', 1)
    sess.cookie.secure = true,
        sess.cookie.httpOnly = false,
        Object.assign(sess.cookie, { sameSite: "none" });
}

app.use(session(sess))


//MONGO DB PROCESS
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
//const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}`;
mongoose.connect('mongodb+srv://nshah:nshah@cluster0.egczgje.mongodb.net/tuiter-project')

//Create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const adminController = AdminController.getInstance(app);
const authenticationController = AuthenticationController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
