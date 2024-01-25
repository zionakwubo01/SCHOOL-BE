import { Request, Response } from "express"
import Schoolmodel from "../Model/Schoolmodel"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { verifiedEmail } from "../utils/Email"
import bcrypt from "bcrypt"

export const CreateSchool = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.body


        const token = crypto.randomBytes(3).toString("hex")

        const school = await Schoolmodel.create({
            email,
            token,
            status: 201,
            started: true
        })

        verifiedEmail(school)


        return res.status(201).json({
            messsage: "school created",
            data: school
        })

    } catch (error: any) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const UpdateSchoolName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { schoolID } = req.params
        const { schoolName } = req.params

        const update = await Schoolmodel.findByIdAndUpdate(
            schoolID,
            { name: schoolName },
            { new: true }
        )

        return res.status(201).json({
            messsage: "school name updated",
            data: update
        })

    } catch (error: any) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const Viewschool = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { schoolID } = req.params
        const school = await Schoolmodel.findById(schoolID)

        return res.status(201).json({
            messsage: "school found",
            data: school
        })

    } catch (error: any) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const VerifySchool = async (req: Request, res: Response) => {
    try {
        const { schoolID } = req.params

        const checkSchool = await Schoolmodel.findById(schoolID)

        if (checkSchool) {
            await Schoolmodel.findByIdAndUpdate(
                schoolID,
                { verify: true },
                { new: true }
            )
            return res.status(200).json({
                message: "user verified"
            })

        } else {
            return res.status(404).json({
                message: "school dosent exist sign up"
            })

        }
    } catch (error: any) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const loginSchool = async (
    req: any,
    res: Response
) => {
    try {
        const { email, token } = req.body;

        const school = await Schoolmodel.findOne({
            email
        });
        console.log(school)
        if (school) {
            if (school.verify === true) {
                if (school.token === token) {
                    const token = jwt.sign({ status: school.status, id: school._id }, process.env.secret!, {
                        expiresIn: "1d",
                    });


                    return res.status(201).json({
                        message: "welcome back",
                        data: token,
                    });
                } else {
                    return res.status(404).json({
                        message: "Error reading your school enrollment ID",
                    });
                }
            } else {
                return res.status(404).json({

                    message: "please check your email to verify your account",
                });
            }
        } else {
            return res.status(404).json({
                message: "Error finding school",
            });
        }

    } catch (error) {
        return res.status(404).json({
            message: "Error creating school",
        });
    }
};