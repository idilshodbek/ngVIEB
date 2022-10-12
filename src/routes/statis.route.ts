import { Router, NextFunction, Request, Response } from 'express';
import Route from '../interfaces/route-interface';

class StatisRoute implements Route {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log("THIS IS WORKING")
    this.router.get(`${this.path}/start`, (req: Request, res: Response, next: NextFunction) => {
      res.render('index');
    });
  }
}

export default StatisRoute;
