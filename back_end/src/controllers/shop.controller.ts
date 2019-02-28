import * as express from 'express';
import ShopNotFoundException from '../exceptions/ShopNotFoundException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateShopDto from '../dtos/shop.dto';
import ShopInterface from '../interfaces/shop.interface';
import ShopModel from '../models/shop.model';

class ShopController implements Controller {
    public path = '/shops';
    public router = express.Router();
    private shop = ShopModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getShops);
        this.router.get(`${this.path}/:id`, this.getShopById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateShopDto, true), this.modifyShop)
            .delete(`${this.path}/:id`, this.deleteShop)
            .post(this.path, authMiddleware, validationMiddleware(CreateShopDto), this.createShop);
    }

    private getShops = async (request: express.Request, response: express.Response) => {
        const Shops = await this.shop.find();
        response.send(Shops);
    }

    private getShopById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const Shop = await this.shop.findById(id);
        if (Shop) {
            response.send(Shop);
        } else {
            next(new ShopNotFoundException(id));
        }
    }

    private modifyShop = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const shopData: ShopInterface = request.body;
        const shop = await this.shop.findByIdAndUpdate(id, shopData, { new: true });
        if (shop) {
            response.send(shop);
        } else {
            next(new ShopNotFoundException(id));
        }
    }

    private createShop = async (request: RequestWithUser, response: express.Response) => {
        const shopData: CreateShopDto = request.body;
        const createdShop = new this.shop({
            ...shopData
        });
        const savedShop = await createdShop.save();
        response.send(savedShop);
    }

    private deleteShop = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const successResponse = await this.shop.findByIdAndDelete(id);
        if (successResponse) {
            response.send(200);
        } else {
            next(new ShopNotFoundException(id));
        }
    }
}

export default ShopController;
