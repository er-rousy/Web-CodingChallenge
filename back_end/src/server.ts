import 'dotenv/config';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';
import ShopController from './controllers/shop.controller';
import UserController from './controllers/user.controller';
import validateEnv from './utils/validate-env';

//validateEnv();

const app = new App(
  [
    new ShopController(),
    new AuthenticationController(),
    new UserController(),
  ],
);

app.listen();