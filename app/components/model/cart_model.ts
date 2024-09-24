import { ProductModel } from "./product_model";

export interface CartModel {
    products: ProductModel[];
    totalPrice: number;
    totalItems: number;
    id: string;
}