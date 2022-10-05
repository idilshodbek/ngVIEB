import HttpException from "../exceptions/HttpExceptions";
import { ExamBlock } from "../interfaces/exam-block.interface";
import examBlockModel from "../models/exam-block.models";
import bcrypt from "bcrypt";

interface FilterInterface {
    isActive: boolean,
}

class ExamBlockService {
    public exam = examBlockModel;

    public async createExamBlock(reqData: any): Promise<ExamBlock> {
        if (await this.exam.findOne({ code: reqData.body.code })) {
            throw new HttpException(400, `Exam Block with code ${reqData.body.tel} already exists`);
        }
        var obj: any = {};
        obj['time-limit'] = reqData.body['time-limit'];
        obj['code'] = reqData.body['code'];
        obj['name'] = reqData.body['name'];
        obj['createdBy'] = reqData.userId.toString();
        obj['isActive'] = true;
        const examData = new this.exam(obj);
        const exam = await examData.save();

        return exam;
    }
}

export default ExamBlockService;