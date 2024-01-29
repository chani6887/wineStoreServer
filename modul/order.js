import Joi from "joi";
import mongoose from "mongoose";

const minimalProduct = mongoose.Schema({
    qty: Number,
    productCode: String,
    name: String
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    toDate: { type: Date, default: Date.now() },
    address: { type: String, required: true },
    orderCode: String,
    product: [minimalProduct],
    isCare: Boolean
})


export const Order = mongoose.model("orders", orderSchema)

export const orderValidator = (orderToValidate) => {
    let orderJoi = Joi.object({
        orderDate: Joi.date(),
        toDate: Joi.date(),
        address: Joi.string(),
        orderCode: Joi.string(),
        product: Joi.string(),
        isCare: boolean()

    });
    return orderJoi.validate(orderToValidate);
}

