import { CartItems } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItems[]) => {
  return items.reduce((sum, obj) => obj.price * obj.repeatCount + sum, 0);
};
