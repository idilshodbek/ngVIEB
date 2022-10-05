import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import UserServices from '../services/users.service';

class UsersController {
    public userService = new UserServices;

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser(req);
            res.status(200).json({ data: findAllUsersData, total: findAllUsersData.length, message: "ok" })
        } catch (error) {
            next(error);
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findOneUserData: User = await this.userService.findUserById(req.params.id);
            res.status(200).json({ data: findOneUserData, message: 'User found' });
        } catch (error) {
            next(error);
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createUserData: User = await this.userService.createUser(req);
            res.status(201).json({ data: createUserData, message: 'User Created' });
        } catch (error) {
            next(error);
        }
    }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUserData: User = await this.userService.updateUser(req.params.id, req);
      res.status(200).json({ data: updateUserData, message: 'User updated' });
    } catch (error) {
      next(error);
    }
  }
  public updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUserData: User = await this.userService.updateUserStatus(req.params.id);
      res.status(200).json({ data: updateUserData, message: 'User updated' });
    } catch (error) {
      next(error);
    }
  }

}

export default UsersController;