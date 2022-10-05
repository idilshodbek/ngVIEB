import { Router } from 'express';
import ExamBlockController from '../controllers/exam-block.controller';
import Route from '../interfaces/route-interface';
import isAuth from "../middlewares/is-auth.middleware";

class ExamBlockRoute implements Route {
  public path = '/exam/block';
  public router = Router();
  public examController = new ExamBlockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, isAuth, this.examController.getExam);
    this.router.post(`${this.path}`, isAuth, this.examController.createExam);
  }
}

export default ExamBlockRoute;
