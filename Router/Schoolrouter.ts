import { Router } from "express";
import {
    CreateSchool,
    UpdateSchoolName,
    VerifySchool,
    Viewschool,
    loginSchool
} from "../controller/Schoolcontroller";

const router: Router = Router()

router.route("/create-school").post(CreateSchool)
router.route("/verify-school/:schoolID").post(VerifySchool)
router.route("/view-school/:schoolID").get(Viewschool)
router.route("/update-school/:schoolID").patch(UpdateSchoolName)
router.route("/login-school").post(loginSchool)

export default router;