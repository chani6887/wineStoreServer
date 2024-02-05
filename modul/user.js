import Joi from "joi";
import mongoose from "mongoose";
import * as roleTypes from "./roleTypes.js";

const userSchema = mongoose.Schema({
    userName: String,
    email: { type: String},
    password: { type: String },
    roles: {
        type: String, default: roleTypes.ADMIN
    },
}, { timestamps: true });

export const User = mongoose.model("users", userSchema);

export const userValidator = (userToValidate) => {
    let userJoi = Joi.object({
        userName: Joi.string().max(20),
        email: Joi.string().required(),
        password: Joi.string().required(),
        roles:Joi.string()
        
    }).unknown()
    return userJoi.validate(userToValidate);
};
export const userValidator2=(userToValidate)=>{
    let userJoi = Joi.object({
        userName: Joi.string().max(20),
        email: Joi.string().required(),
    }).unknown()
    return userJoi.validate(userToValidate);
}
