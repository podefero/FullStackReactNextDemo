import { CartModel } from "./cart_model";

export interface OrderHistoryModel {
    carts: CartModel[];
    id: string;
}