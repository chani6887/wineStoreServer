import { Wine, wineValidator } from "../modul/wine.js";
import mongoose from "mongoose";

export const  getAllwines= async(req,res)=> {

    let { search, type} = req.query;
    try {
        let allwines;
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");
        if (type)
            serachObject.type = type
        allwines = await Wine.find(serachObject)
        
        res.json(allwines)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל היינות" + err.message)
    }
}

//לך המשועממת ניתן להוסיף WINEBTWEEN
export const getwineById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("קוד אינו תקין")
        let wine = await Wine.findById(req.params.id) 
        if (!wine)
            return res.status(404).send("לא קיים יין עם כזה קוד")
        res.json(wine)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את היין " + err.message)
    }
}
export const deletewine = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");


    let deletedwine = await Wine.findByIdAndDelete(id)
    if (!deletedwine)
        return res.status(404).send("לא נמצא יין עם כזה קוד למחיקה")
    return res.json(deletedwine);


}


export const addwine = async (req, res) => {
    let { name, type, isLocallyMade, publishDate } = req.body;
    let validate = wineValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error[0])


    try {
        let samewines = await Wine.find({ name, type });
        if (samewines.length > 0)
            return res.status(409).send("כבר קיים יין בשם כזה עם אות סוג ")
        let newwine = await Wine.create({ name, type, isLocallyMade:isLocallyMade||true, publishDate  })
        return res.status(201).json(newwine)
    }
    catch (err) {
        res.status(400).send(" יין זה אא להוסיף" + err)
    }
}



export const updatewine = async (req, res) => {
    


    let { wineid } = req.params;
    if (!mongoose.isValidObjectId(wineid))
        return res.status(400).send("not valid id");
    try {


        let wineToUpdate = await wine.findById(wineid);
        if (!wineToUpdate)
            return res.status(404).send("לא נמצא יין עם קוד כזה")
        wineToUpdate.name = req.body.name || wineToUpdate.name;
        wineToUpdate.type = req.body.type || wineToUpdate.type;
        wineToUpdate.publishDate = req.body.publishDate || wineToUpdate.publishDate;
        wineToUpdate.isLocallyMade = req.body.isLocallyMade || wineToUpdate.isLocallyMade;


        await wineToUpdate.save();
        res.json(wineToUpdate);
    } catch (err) {
        res.status(400).send("אא לעדכן" + err)
    }


}

