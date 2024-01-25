"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchool = exports.VerifySchool = exports.Viewschool = exports.UpdateSchoolName = exports.CreateSchool = void 0;
const Schoolmodel_1 = __importDefault(require("../Model/Schoolmodel"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Email_1 = require("../utils/Email");
const CreateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const school = yield Schoolmodel_1.default.create({
            email,
            token,
            status: 201,
            started: true
        });
        (0, Email_1.verifiedEmail)(school);
        return res.status(201).json({
            messsage: "school created",
            data: school
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.CreateSchool = CreateSchool;
const UpdateSchoolName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { schoolName } = req.params;
        const update = yield Schoolmodel_1.default.findByIdAndUpdate(schoolID, { name: schoolName }, { new: true });
        return res.status(201).json({
            messsage: "school name updated",
            data: update
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.UpdateSchoolName = UpdateSchoolName;
const Viewschool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const school = yield Schoolmodel_1.default.findById(schoolID);
        return res.status(201).json({
            messsage: "school found",
            data: school
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.Viewschool = Viewschool;
const VerifySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const checkSchool = yield Schoolmodel_1.default.findById(schoolID);
        if (checkSchool) {
            yield Schoolmodel_1.default.findByIdAndUpdate(schoolID, { verify: true }, { new: true });
            return res.status(200).json({
                message: "user verified"
            });
        }
        else {
            return res.status(404).json({
                message: "school dosent exist sign up"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.VerifySchool = VerifySchool;
const loginSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const school = yield Schoolmodel_1.default.findOne({
            email
        });
        console.log(school);
        if (school) {
            if (school.verify === true) {
                if (school.token === token) {
                    const token = jsonwebtoken_1.default.sign({ status: school.status, id: school._id }, process.env.secret, {
                        expiresIn: "1d",
                    });
                    return res.status(201).json({
                        message: "welcome back",
                        data: token,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Error reading your school enrollment ID",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "please check your email to verify your account",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error finding school",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating school",
        });
    }
});
exports.loginSchool = loginSchool;
