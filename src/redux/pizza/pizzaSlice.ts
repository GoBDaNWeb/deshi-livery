import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {PizzaItems, PizzaFetchParams, PizzaState, Status} from './types'

export const fetchPizza = createAsyncThunk<PizzaItems[], PizzaFetchParams>(
    'pizza/fetchPizza',
     async (params) => 
    {
        const {sortBy,category,search} = params
        const { data } = await axios.get(`https://62b9cb2841bf319d2285a97b.mockapi.io/items?&category=${category}&sortBy=${sortBy}&search=${search}`)
        return data
    }
)

const initialState: PizzaState = {
    items: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state: PizzaState, action: PayloadAction<PizzaItems[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
      
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
      
        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer