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
        product: Joi.array().items(Joi.object({
            qty: Joi.number(),
            productCode: Joi.string(),
            name: Joi.string()
        })),
        isCare: Joi.boolean()
    });
    return orderJoi.validate(orderToValidate);
}


// {
//     "orderDate": "2022-01-30",
//     "toDate": "2022-02-05",
//     "address": "123 Main St, City",
//     "orderCode": "ABC123",
//     "product": [
//       {
//         "qty": 1,
//         "productCode": "P001",
//         "name": "Product 1"
//       },
//       {
//         "qty": 2,
//         "productCode": "P002",
//         "name": "Product 2"
//       }
//     ],
//     "isCare": true
//   }


