import HttpException from "../exceptions/HttpExceptions";
import { Exam } from "../interfaces/exam.interface";
import examModel from "../models/exam.models";
import bcrypt from "bcrypt";

interface FilterInterface {
    isActive: boolean,
}

class ExamService {
    public exam = examModel;

    public async createExam(reqData: any): Promise<Exam> {
        if (await this.exam.findOne({ code: reqData.body.code })) {
            throw new HttpException(400, `Exam  with code ${reqData.body.tel} already exists`);
        }
        var obj: any = {};
        obj['time-limit'] = reqData.body['time-limit'];
        obj['code'] = reqData.body['code'];
        obj['name'] = reqData.body['name'];
        obj['createdBy'] = reqData.userId.toString();
        obj['isActive'] = true;
        const examData = new this.exam(obj);
        const examSave: any = await examData.save();

        return examSave;
    }

    public async findAllExam(reqBody: any): Promise<Exam[]> {
        let status: boolean = true
        if (reqBody.query.status === 'inactive') status = false
        var filterObj: FilterInterface = {
            isActive: status,
        };
        const exams: any = await this.exam.find(filterObj)
            .populate('createdBy', "name")
        return exams
    }

    public async findExam(reqBody: any): Promise<Exam[]> {
        let _id: boolean = reqBody.params.id;
        const examData: any = await this.exam.findById(_id)
            .populate('createdBy', "name")
        return examData
    }

    public async updateExam(examId: string, reqData: any): Promise<Exam> {
        const examData: any = await this.exam.findByIdAndUpdate(examId, reqData.body);
        if (examData) return examData;
        throw new HttpException(409, "You're not user");
    }

    public async deleteExam(examId: string): Promise<Exam> {
        const examData: any = await this.exam.findByIdAndDelete(examId);
        if (examData) return examData;
        throw new HttpException(409, "Could not delete exam !");
    }
}

export default ExamService;