import HttpException from "../exceptions/HttpExceptions";
import userModel from "../models/users.models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthService {
    public user = userModel;

    public async login(reqData: any): Promise<any[]> {
        const tel = reqData.body.tel;
        const password = reqData.body.password;
        let loadedUser: any;

        // check if user with entered tel exist
        var isUserExist = await this.user.findOne({ tel: tel })
        // if does not user exist with entered tel throw error
        if (!isUserExist) throw new HttpException(401, "A user with this tel could not be found!")

        loadedUser = isUserExist;
        var isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatch) {
            throw new HttpException(401, "Wrong Password!")
        }
        var jwtObj: any = {
            tel: loadedUser.tel,
            userId: loadedUser._id.toString()
        };
        const { JWT_SECRET }: any = process.env
        const token: any = jwt.sign(
            jwtObj,
            JWT_SECRET,
            { expiresIn: '14d' }
        );
        return token
    }
}

export default AuthService;