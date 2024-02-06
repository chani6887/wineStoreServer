import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/dbConfig.js";
import wineRouter from "./routs/wine.js";
import userRouter from "./routs/user.js";
import {erroHandling} from "./middlewares/errorHanding.js"
import orderRouter from "./routs/order.js";  
config(); 
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/wines", wineRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use(erroHandling);

// app.use((err, req, res, next) => {
//     res.status(res.statusCode || 500);
//     res.send(err.message || "התרחשה תקלה")
// })


let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})



