import HttpException from "../exceptions/HttpExceptions";
import { ExamBlock } from "../interfaces/examBlock.interface";
import examBlockModel from "../models/examBlock.models";

interface FilterInterface {
    isActive: boolean,
}

class ExamBlockService {
    public examBlock = examBlockModel;

    public async createExamBlock(reqData: any): Promise<ExamBlock> {
        if (!reqData.body.parent) {
            throw new HttpException(400, `Parent exam is required`);
        }
        const examBlockData = new this.examBlock(reqData.body);
        const examBlockSave: any = await examBlockData.save();

        return examBlockSave;
    }

    public async findAllExamBlock(reqBody: any): Promise<ExamBlock[]> {
        let parentId: string = reqBody.params.parent;
        const examBlocks: any = await this.examBlock.find({parent: parentId})
            .populate('createdBy', "name")
        return examBlocks
    }

    public async findExamBlock(reqBody: any): Promise<ExamBlock[]> {
        let _id: boolean = reqBody.params.id;
        const examBlockData: any = await this.examBlock.findById(_id)
            .populate('createdBy', "name")
        return examBlockData
    }

    public async updateExamBlock(examBlockId: string, reqData: any): Promise<ExamBlock> {
        const examBlockData: any = await this.examBlock.findByIdAndUpdate(examBlockId, reqData.body);
        if (examBlockData) return examBlockData;
        throw new HttpException(409, "You're not user");
    }

    public async deleteExamBlock(examBlockId: string): Promise<ExamBlock> {
        const examBlockData: any = await this.examBlock.findByIdAndDelete(examBlockId);
        if (examBlockData) return examBlockData;
        throw new HttpException(409, "Could not delete examBlock !");
    }
}

export default ExamBlockService;