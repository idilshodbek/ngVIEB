import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Route from '../interfaces/route-interface';
// import validationMiddleware from '../middlewares/validation.middleware';
// import validationJsonResponseMiddleware from '../middlewares/validationJsonResponse.middleware';

class AuthRouter implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.auth);
  }
}

export default AuthRouter;
