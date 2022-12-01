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
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";
import { convertCompilerOptionsFromJson } from 'typescript';
import AdminController from './controllers/AdminController';
var cors = require('cors')

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}`;

// connect to the database

//TO-DO 
//mongoose.connect(connectionString);
mongoose.connect('mongodb+srv://nshah:nshah@cluster0.egczgje.mongodb.net/tuiter-project')

const app = express();
app.use(express.json());
app.use(cors());

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const adminController = AdminController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
