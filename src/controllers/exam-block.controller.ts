import { NextFunction, Request, Response } from 'express';
import { ExamBlock } from '../interfaces/exam-block.interface';
import ExamBlockService from '../services/exam-block.service';

class ExamBlockController {
    public examService = new ExamBlockService;
    public getExam = async (req: Request, res: Response, next: NextFunction) => {
        console.log("EXAM LIST GETTING")
    }
    public createExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamData: ExamBlock = await this.examService.createExamBlock(req);
            res.status(201).json({ data: createExamData, message: 'Exam Block Created' });
        } catch (error) {
            next(error);
        }
    }

}

export default ExamBlockController;