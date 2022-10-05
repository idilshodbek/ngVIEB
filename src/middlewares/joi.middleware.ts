import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
const isBodyValid = (req: Request, res: Response, next: NextFunction) => {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: "Required fields must be filled"})
  }
  next();
}

export default isBodyValid