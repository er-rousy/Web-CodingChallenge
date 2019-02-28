 interface ShopInterface {
    _id: string;
    picture: string;
    name: string;
    email: string;
    city: string;
    location: {
        type: string;
        coordinates: any[];
    }
}

export default ShopInterface;