import { CartItems } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartDataLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItems[],
    totalPrice,
  };
};
