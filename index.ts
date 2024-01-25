import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import session, { Cookie, Session } from "express-session"
import mongoDb from "connect-mongodb-session"
import morgan from "morgan"
import helmet from "helmet"
import { dbconfig } from "./utils/dbconfig"
import { Mainapp } from "./Mainapp"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()

const Url: string = process.env.Url!
console.log("this is url", Url)
const mongoDbstore = mongoDb(session)
const store = new mongoDbstore({
    uri: Url!,
    collection: "sessions"
})


const portSERVER = process.env.PORT!
const port = parseInt(portSERVER)
console.log("this is port", port)
console.log("this is secret", process.env.secret!)
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
Mainapp(app)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})
app.use(cors({ origin: "http://localhost:5174" }))
app.use(morgan("dev"))
app.use(helmet())
app.use(session({
    secret: process.env.secret!,
    resave: false,
    saveUninitialized: false,

    cookie: {
        sameSite: "lax",
        secure: false,
    },
    store
}))

const server = app.listen(port, () => {
    console.log("server is established")
    dbconfig()
})



process.on("uncaughtException", (error: Error) => {
    process.exit(1)
})
process.on("unhandledRejection", (reason: any) => {
    server.close(() => {
        process.exit(1)
    })
})