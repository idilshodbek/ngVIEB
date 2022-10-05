import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
    public authService = new AuthService;

    public auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createRoleData: any[] = await this.authService.login(req);

            res.cookie(`token`, createRoleData, { maxAge: 86400000 });
            res.status(200).json({ message: "Successfully loged in", token: createRoleData});
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;