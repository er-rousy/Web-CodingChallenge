import * as mongoose from 'mongoose';
import ShopInterface from '../interfaces/shop.interface';

const ShopSchema = new mongoose.Schema({
    _id: String,
    picture: String,
    name: String,
    email: String,
    city: String,
    location: {
        type: String,
        coordinates: []
    }
});

const ShopModel = mongoose.model<ShopInterface & mongoose.Document>('shops', ShopSchema);

export default ShopModel;