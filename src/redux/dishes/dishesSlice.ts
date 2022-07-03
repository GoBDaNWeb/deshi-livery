import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {DishesItems, DishesFetchParams, DishesState, Status} from './types'
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity'

export const fetchDishes = createAsyncThunk<DishesItems[], DishesFetchParams>(
    'dishes/fetchDishes',
     async (params) => {
        const {sortBy, category, search} = params
        console.log(params, 4444);
        const { data } = await axios.get<DishesItems[]>(`https://62b9cb2841bf319d2285a97b.mockapi.io/dishes`, {
            params: pickBy(
              {
                category,
                sortBy,
                search,
              },
              identity,
            ),
          })
        return data
    }
)

const initialState: DishesState = {
    items: [],
    status: Status.LOADING,
}

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        setItems(state: DishesState, action: PayloadAction<DishesItems[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDishes.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
      
        builder.addCase(fetchDishes.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
      
        builder.addCase(fetchDishes.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
})

export const {setItems} = dishesSlice.actions

export default dishesSlice.reducer