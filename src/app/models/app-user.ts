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
    constructor(public product: Product, public quantity: number) {}
    get totalPrice() { return this.product.price * this.quantity; }
}

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]:  ShoppingCartItem }) {
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuantity(product: Product) {
        console.log(product);
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
