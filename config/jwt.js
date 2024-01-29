import jwt from "jsonwebtoken";
export const generateToken = (user) => {
    console.log(user._id);
    console.log(user.userName);
    console.log(user.roles);
    let token = jwt.sign(
        { _id: user._id, userName: user.userName, roles: user.roles },
        process.env.JWT_SECRET,
        {
            expiresIn: "60m"
        }
    )

    return token;

    }