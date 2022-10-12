import { NextFunction, Request, Response } from 'express';
import { ExamBlock } from '../interfaces/examBlock.interface';
import ExamBlockService from '../services/examBlock.service';

class ExamBlockController {
    public examBlockService = new ExamBlockService;
    public createExamBlock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamBlockData: ExamBlock = await this.examBlockService.createExamBlock(req);
            res.status(201).json({ data: createExamBlockData, message: 'Exam Block Created' });
        } catch (error) {
            next(error);
        }
    }

    public getAllExamBlock = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const getAllExamBlockData:  ExamBlock[] = await this.examBlockService.findAllExamBlock(req);
            res.status(200).json({ data: getAllExamBlockData, total: getAllExamBlockData.length, message: "ok" })
        } catch (error) {
            next(error)
        }
    }

    public getExamBlock = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const getExamBlockData:  ExamBlock[] = await this.examBlockService.findExamBlock(req);
            res.status(200).json({ data: getExamBlockData, total: getExamBlockData.length, message: "ok" })
        } catch (error) {
            next(error)
        }
    }

    public updateExamBlock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamBlockData: ExamBlock = await this.examBlockService.updateExamBlock(req.params.id, req);
            res.status(200).json({ data: createExamBlockData, message: 'Exam Block Updated' });
        } catch (error) {
            next(error);
        }
    }
    public deleteExamBlock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamBlockData: ExamBlock = await this.examBlockService.deleteExamBlock(req.params.id);
            res.status(200).json({ message: 'Exam Block Deleted' });
        } catch (error) {
            next(error);
        }
    }
}

export default ExamBlockController;