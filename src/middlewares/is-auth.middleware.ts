import HttpException from "../exceptions/HttpExceptions";
import jwt from "jsonwebtoken";
import userModel from "../models/users.models";
import { Request, Response, NextFunction } from "express";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: any = req.get('Authorization');
    if (!authHeader) {
        res.redirect('/login');
        throw new HttpException(401, "Not authenticated!")
    }
    const token: string = authHeader.split(' ')[1];

    let decodedToken: any;
    try {
        const { JWT_SECRET }: any = process.env
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        res.redirect('/login');
        throw new HttpException(401, "Not authenticated!")
    }
    if (!decodedToken) {
        res.redirect('/login');
        throw new HttpException(401, "Not authenticated!")
    }
    const userId: string = decodedToken.userId;
    var userData: any = await userModel.findById(userId)
        .select('-password')
    if (!userData) throw new HttpException(404, "Culd not find admin!")
    req.role = userData.role;
    req.userId = userData._id;
    next();
}

export default isAuth