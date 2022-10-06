import { NextFunction, Request, Response } from 'express';
import { Exam } from '../interfaces/exam.interface';
import ExamService from '../services/exam-block.service';

class ExamController {
    public examService = new ExamService;
    public createExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamData: Exam = await this.examService.createExam(req);
            res.status(201).json({ data: createExamData, message: 'Exam Created' });
        } catch (error) {
            next(error);
        }
    }

    public getAllExam = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const getAllExamData:  Exam[] = await this.examService.findAllExam(req);
            res.status(200).json({ data: getAllExamData, total: getAllExamData.length, message: "ok" })
        } catch (error) {
            next(error)
        }
    }

    public getExam = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const getAllExamData:  Exam[] = await this.examService.findExam(req);
            res.status(200).json({ data: getAllExamData, total: getAllExamData.length, message: "ok" })
        } catch (error) {
            next(error)
        }
    }

    public updateExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamData: Exam = await this.examService.updateExam(req.params.id, req);
            res.status(200).json({ data: createExamData, message: 'Exam Updated' });
        } catch (error) {
            next(error);
        }
    }
    public deleteExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createExamData: Exam = await this.examService.deleteExam(req.params.id);
            res.status(200).json({ message: 'Exam Deleted' });
        } catch (error) {
            next(error);
        }
    }
}

export default ExamController;