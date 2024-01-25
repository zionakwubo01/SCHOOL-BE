import { Document, Schema, model } from "mongoose";



interface iSchool {
    email: string,
    token: string,
    status: string,
    verify: boolean,
    started: boolean,
    name: string
}

interface iSchooldata extends iSchool, Document { }

const Schoolmodel = new Schema<iSchooldata>({
    email: {
        type: String
    },
    status: {
        type: String
    },
    name: {
        type: String,
        default: "in't"
    },
    verify: {
        type: Boolean,
        default: false
    },
    started: {
        type: Boolean,
    },
    token: {
        type: String
    }
},
    { timestamps: true }
)


export default model<iSchooldata>("school", Schoolmodel)