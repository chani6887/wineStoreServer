
import { User, userValidator ,userValidator2} from '../modul/user.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../config/jwt.js'

export const addUser = async (req, res) => {
    let { userName, email, password } = req.body;
    // let userName=req.body.userName
    let userValidat = userValidator(req.body)
    if (userValidat.error)
        return res.status(400).send("אתה נופל על הכנסת פרטי משתמש לא תקיניים " + userValidat.message);



    try {
      let user = await User.find({ userName,email })
        if (user.length > 0)
            return res.status(404).send("כבר קיים משתמש בשם וסיסמא אלו")
        const hashedPassword = await bcrypt.hash(password, 10);
         consol.log("נפילה 1")
        // let newUser = await User.create({ userName,password:hashedPassword, roles })
         consol.log("נפילה 2")
        let newUser = await User.create({ userName,email,password:hashedPassword,roles })
         consol.log("3")
       let { _id, userName: u, email: e, role} = newUser
         consol.log("4")
        let token = generateToken(newUser);
        consol.log("נפילה 5")
         res.json({ _id, userName: u, email: e, roles, token });
          consol.log("נפילה 6")
      }
    catch (error) {
        return res.status(401).send("error  "+error.message);
    }
}

export const login = async (req, res) => {
    let { userName, email } = req.body
    let userValidat = userValidator2(req.body)
    if (userValidat.error)
        return res.status(400).send(userValidat.error.message)

    try {
        let user = await User.findOne({ userName ,email})
        if (!user)
            return res.status(404).send("לא קיים משתמש עם כזה קוד")
        let token = generateToken(user)
        res.json({_id,userName ,email,roles, token})


    }
    catch (err) {
        res.status(400).send("לא ניתן להכנס " + err.message)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allusers;
        allusers = await User.find({})
        res.json(allusers)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל המשתמשים" + err.message)
    }
}
