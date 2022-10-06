import { Router } from 'express';
import ExamController from '../controllers/exam-block.controller';
import Route from '../interfaces/route-interface';
import isAuth from "../middlewares/is-auth.middleware";

class ExamRoute implements Route {
  public path = '/exam/block';
  public router = Router();
  public examController = new ExamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, isAuth, this.examController.getAllExam);
    this.router.get(`${this.path}/:id`, isAuth, this.examController.getExam);
    this.router.post(`${this.path}`, isAuth, this.examController.createExam);
    this.router.put(`${this.path}/:id`, isAuth, this.examController.updateExam);
    this.router.delete(`${this.path}/:id`, isAuth, this.examController.deleteExam);
  }
}

export default ExamRoute;
