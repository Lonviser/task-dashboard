import { createSlice } from "@reduxjs/toolkit";


interface CounterState {
    done: number
}

const initialState: CounterState = {
    done: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.done += 1
        },
        decrement: (state) => {
            state.done -= 1
        }
    }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer