import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartSliceState, CartItems} from './types'
import {calcTotalPrice} from '../../utils/calcTotalPrice'
import {getCartDataLS} from '../../utils/getCartDataLS'

const initialState:CartSliceState = getCartDataLS()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state: CartSliceState, action: PayloadAction<CartItems>) {
            const find = state.items.find(item => item.id === action.payload.id)
            if (find) {
                find.repeatCount++
            } else {
                state.items.push({...action.payload, repeatCount: 1})
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        plusItem(state: CartSliceState, action: PayloadAction<string>) {
            console.log(action.payload);
            const find = state.items.find(item => item.id === action.payload)
            console.log(find);
            
            if (find) {
                find.repeatCount++
            }
            state.totalPrice = calcTotalPrice(state.items)
            
        },
        minusItem(state: CartSliceState, action: PayloadAction<string>) {
            console.log(action.payload);
           
            const find = state.items.find(item => item.id === action.payload)
            console.log(find);
            if (find) {
                find.repeatCount--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state: CartSliceState, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearItems(state: CartSliceState) {
            state.items = []
            state.totalPrice = 0
        }
    }   
})

export const {addItem, plusItem, minusItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer