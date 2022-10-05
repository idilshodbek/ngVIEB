import HttpException from "../exceptions/HttpExceptions";
import { User } from "../interfaces/users.interface";
import userModel from "../models/users.models";
import bcrypt from "bcrypt";

interface FilterInterface {
    isActive: boolean,
}

class UserServices {
    public user = userModel;

    public async findAllUser(reqBody: any): Promise<User[]> {
        let status: boolean = true
        if (reqBody.query.isActive === 'inactive') status = false
        var filterObj: FilterInterface = {
            isActive: status,
        };
        const users = await this.user.find(filterObj).select("-password -groups -updatedBy")
            .populate('createdBy', "name")
        return users
    }

    public async findUserById(userId: string): Promise<User> {
        const user = await this.user.findById(userId)
            .populate("createdBy", "name")
            .select("-password -__v");
        if (user) return user;
        throw new HttpException(409, "You're not user");
    }

    public async createUser(reqData: any): Promise<User> {
        if (await this.user.findOne({ tel: reqData.body.tel })) {
            throw new HttpException(400, `User with tel ${reqData.body.tel} already exists`);
        }
        var obj: any = {};
        obj.tel = reqData.body.tel;
        obj.name = reqData.body.name;
        obj.isActive = true;
        obj.createdBy = reqData.userId.toString();
        obj.role = reqData.body.role;
        if (
            reqData.body.password != "" &&
            reqData.body.password != undefined &&
            reqData.body.password != "undefined"
        ) {
            obj.password = bcrypt.hashSync(reqData.body.password, 12);
        }

        const userData = new this.user(obj);
        const user = await userData.save();

        return user;
    }

    public async updateUser(userId: string, reqData: any): Promise<User> {
        var obj: any = {};
        if (reqData.body.password) obj.password = bcrypt.hashSync(reqData.body.password, 12);
        if (reqData.body.birthday) obj.birthday = reqData.body.birthday;
        obj.tel = reqData.body.tel;
        obj.name = reqData.body.name;
        if (reqData.body.amount) obj.amount = reqData.body.amount;
        obj.role = reqData.body.role;
        if (reqData.body.type) obj.type = reqData.body.type;
        const user = await this.user.findByIdAndUpdate(userId, obj);
        if (user) return user;
        throw new HttpException(409, "You're not user");
    }

    public async updateUserStatus(userId: string): Promise<User> {
        var obj: any = {};
        const userFind: any = await this.user.findById(userId).select("isActive");
        if (!userFind) throw new HttpException(409, "User not found");

        obj.isActive = true;
        if (userFind.isActive === true) obj.isActive = false
        
        const user = await this.user.findByIdAndUpdate(userId, obj);
        if (user) return user;
        throw new HttpException(409, "User not found");
    }

}

export default UserServices;