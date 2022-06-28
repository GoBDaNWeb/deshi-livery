import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterState, Sort, SortPropertyEnum} from './types'

const initialState: FilterState = {
    categoryId: 0,
    searchValue: '',
    sortType: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state: FilterState, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state: FilterState, action: PayloadAction<Sort>) {
            state.sortType = action.payload
        },
        setSearchValue(state: FilterState, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setFilters(state: FilterState, action: PayloadAction<FilterState>) {
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = action.payload.sortType
        }
    }
})

export const {setCategoryId, setSortType, setSearchValue, setFilters} = filterSlice.actions

export default filterSlice.reducer