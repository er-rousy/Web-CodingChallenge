import HttpException from './HttpException';

class ShopNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Shop with id ${id} not found`);
  }
}

export default ShopNotFoundException;
