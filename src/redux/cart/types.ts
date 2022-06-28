export type CartItems = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    repeatCount: number;
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItems[],
}