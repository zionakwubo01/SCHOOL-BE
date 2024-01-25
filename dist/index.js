"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dbconfig_1 = require("./utils/dbconfig");
const Mainapp_1 = require("./Mainapp");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Url = process.env.Url;
console.log("this is url", Url);
const mongoDbstore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new mongoDbstore({
    uri: Url,
    collection: "sessions"
});
const portSERVER = process.env.PORT;
const port = parseInt(portSERVER);
console.log("this is port", port);
console.log("this is secret", process.env.secret);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, Mainapp_1.Mainapp)(app);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use((0, cors_1.default)({ origin: "http://localhost:5174" }));
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax",
        secure: false,
    },
    store
}));
const server = app.listen(port, () => {
    console.log("server is established");
    (0, dbconfig_1.dbconfig)();
});
process.on("uncaughtException", (error) => {
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    server.close(() => {
        process.exit(1);
    });
});
