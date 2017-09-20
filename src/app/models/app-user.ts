
export interface AppUser {
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface IProduct {
    title: string;
    price: number;
    category: string;
    description: string;
    imageUrls: object[];
}

export class Product implements IProduct {
    public title: string;
    public price: number;
    public category: string;
    public description: string;
    public imageUrls: object[] = [];

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
