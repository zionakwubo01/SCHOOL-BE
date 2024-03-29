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
exports.Mainapp = void 0;
const Schoolrouter_1 = __importDefault(require("./Router/Schoolrouter"));
const Mainapp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use("/api", Schoolrouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "SCHOOL API"
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "error accesing SCHOOL API"
                });
            }
        });
    }
    catch (error) {
        return error;
    }
});
exports.Mainapp = Mainapp;
