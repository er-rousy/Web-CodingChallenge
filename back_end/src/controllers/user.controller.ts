import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middlewares/auth.middleware';
import ShopModel from '../models/shop.model';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private shop = ShopModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id/shops`, authMiddleware, this.getAllShopsOfUser);
  }

  private getAllShopsOfUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const userId = request.params.id;
    if (userId === request.user._id.toString()) {
      const shops = await this.shop.find({ author: userId });
      response.send(shops);
    }
    next(new NotAuthorizedException());
  }
}

export default UserController;