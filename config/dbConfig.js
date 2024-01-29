import mongoose from "mongoose";


export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb+srv://chsh6887:TI7Cyfyw1D6DMRBJ@cluster0.ajdckh6.mongodb.net/";
    mongoose.connect(mongoURI)
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)
            process.exit(1);//סוגר את התכונית שאנחנו מתחילים להריץ בכישלון
        })


}
