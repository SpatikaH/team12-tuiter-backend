"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const AdminController_1 = __importDefault(require("./controllers/AdminController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
//SESSION PROCESS
const session = require('express-session');
//CORS PROCESS
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
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
};
//Secure Cookies only work with HTTPS
if (process.env.ENV === "PRODUCTION") {
    app.set('trust proxy', 1);
    sess.cookie.secure = true,
        sess.cookie.httpOnly = false,
        Object.assign(sess.cookie, { sameSite: "none" });
}
app.use(session(sess));
//MONGO DB PROCESS
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose_1.default.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.egczgje.mongodb.net/tuiter-project`);
//Create RESTful Web service API
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
const adminController = AdminController_1.default.getInstance(app);
const authenticationController = AuthenticationController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
