import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/manageError';
import { UserService } from '../services/user/userService';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const user = await UserService.getUserLogged({
        user: req.body.user,
        password: req.body.password
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },

  async signin(req: Request, res: Response) {
    try {
      const user = await UserService.signUser(req.body);
      console.log(user);
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(409).json(getErrorMessage(error));
    }
  },

  logout(req: Request, res: Response) {
    res.status(200);
  }
};
