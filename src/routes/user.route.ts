import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import Route from '../interfaces/route-interface';
import isAuth from "../middlewares/is-auth.middleware";

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [isAuth], this.usersController.getUsers);
    this.router.post(`${this.path}`, [isAuth], this.usersController.createUser);
    this.router.get(`${this.path}/:id`, [isAuth], this.usersController.getUserById);
    this.router.put(`${this.path}/:id`, [isAuth], this.usersController.updateUser);
    this.router.put(`${this.path}/status/:id`, [isAuth], this.usersController.updateUserStatus);
  }
}

export default UsersRoute;
