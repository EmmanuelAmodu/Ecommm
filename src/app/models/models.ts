export interface AppUser {
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface IProduct {
    $key: string;
    title: string;
    price: number;
    category: string;
    description: string;
    images: object[];
}

export interface IImage {
    name: string;
    url: string;
}

export class Product implements IProduct {
    public $key: string;
    public title: string;
    public price: number;
    public category: string;
    public description: string;
    public images: Upload[] = [];

    constructor(
        title?: string,
        price?: number,
        category?: string,
        description?: string,
        imageUrls?: object[]
    ) {
        // tslint:disable-next-line:curly
        if (!this.title) this.title = '';
        // tslint:disable-next-line:curly
        if (!this.price) this.price = 0;
        // tslint:disable-next-line:curly
        if (!this.category) this.category = '';
        // tslint:disable-next-line:curly
        if (!this.description) this.description = '';
    }
}

export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
    constructor(file: File) {
      this.file = file;
    }
}

export class Snapshot {
    bytesTransferred: number;
    totalBytes: number;
}

export class ShoppingCartItem {
    $key: string;
    title: string;
    images: Upload[];
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() { return this.price * this.quantity; }
}

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]:  ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({...item, $key: productId}));
        }
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        this.items.forEach(d => sum += d.totalPrice);
        return sum;
    }

    get totalItemCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.itemsMap) {
          count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}

export class Order {
    datePlace: string;
    items: any[];
    totalPriceOfOrder: number;

    constructor(
        public shipping: any,
        shoppingcart: ShoppingCart
    ) {
        this.datePlace = new Date().toJSON();
        this.items = shoppingcart.items.map(i => {
            return {
                product: {
                    prodId: i.$key,
                    title: i.title,
                    image: i.images[0].url,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice,
            };
        });
        this.totalPriceOfOrder = 0;
        this.items.forEach(d => {
            this.totalPriceOfOrder += d.totalPrice;
        });
    }
}

export class ShippingAddress {
    addressLine1: string;
    addressLine2: string;
    city: string;
    name: string;
}

export class UserOrders {
    datePlace: number;
    items: any[];
    orderid: string;
    shipping: ShippingAddress;
    totalPriceOfOrder: number;
    userId: string;

    constructor(order: any, orderid, userId) {
        Object.assign(this, order);
        this.orderid = orderid;
        this.userId = userId;
    }
}
