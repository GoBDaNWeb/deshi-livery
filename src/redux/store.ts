import {configureStore} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import filterReducer from './filter/filterSlice'
import cartReducer from './cart/cartSlice'
import dishesReducer from './dishes/dishesSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        dishes: dishesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
