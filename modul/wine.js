import Joi from "joi";
import mongoose from "mongoose";


const wineSchema = mongoose.Schema({
    name: { type: String, required: true },
    type:{ type: String, required: true },
    modle: Number,
    imgUrl: { type: String, default: "http://localhost:5000/wine/pic1.jpg" },
    isLocallyMade: Boolean,
    publishDate: { type: Date, default: Date.now() }
});
export const Wine = mongoose.model("wines", wineSchema);//מקשר בין הקולקשן

export const wineValidator = (wineToValidate) => {
  let wineJoi=Joi.object({
  name:Joi.string().max(20).required,
  type:Joi.string().allow('dry wine',' Semi-dry wine','sparkling wine','sweet wine','vodka','  Whiskey').required,
  modle:Joi.number(),
  isLocallyMade:Joi.boolean(),
  publishDate:Joi.date(),
  imgUrl:Joi.imgUrl()

  });
  return wineJoi.validate(wineToValidate);
 }

