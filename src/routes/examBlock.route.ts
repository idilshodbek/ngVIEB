import { Router } from 'express';
import ExamBlockController from '../controllers/examBlock.controller';
import Route from '../interfaces/route-interface';
import isAuth from "../middlewares/is-auth.middleware";

class ExamBlockRoute implements Route {
  public path = '/exam/block';
  public router = Router();
  public examBlockController = new ExamBlockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:parent`, isAuth, this.examBlockController.getAllExamBlock);
    this.router.get(`${this.path}/single/:id`, isAuth, this.examBlockController.getExamBlock);
    this.router.post(`${this.path}`, isAuth, this.examBlockController.createExamBlock);
    this.router.put(`${this.path}/:id`, isAuth, this.examBlockController.updateExamBlock);
    this.router.delete(`${this.path}/:id`, isAuth, this.examBlockController.deleteExamBlock);
  }
}

export default ExamBlockRoute;