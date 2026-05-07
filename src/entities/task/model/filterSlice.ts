import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FilterValue = 'all' | 'active' | 'completed';

interface FilterState {
    value: FilterValue;
}

const initialState: FilterState = {
    value: 'all'
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterValue>) => {
            state.value = action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer