"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schoolmodel = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("school", Schoolmodel);
