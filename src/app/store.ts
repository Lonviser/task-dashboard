import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '@/entities/task/model/filterSlice'
import counterReducer from '@/entities/task/model/counterSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        counter: counterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch