import { Application, NextFunction, Request, Response } from "express";
import school from "./Router/Schoolrouter"



export const Mainapp = async (app: Application) => {
    try {
        app.use("/api", school)

        app.get("/", (req: Request, res: Response) => {
            try {
                return res.status(200).json({
                    message: "SCHOOL API"
                })
            } catch (error) {
                return res.status(404).json({
                    message: "error accesing SCHOOL API"
                })
            }
        })


    } catch (error) {
        return error
    }
}