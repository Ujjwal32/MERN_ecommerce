import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

export const fetchOrder = createAsyncThunk('order/fetch',async () => {
    const orders = await axios.get('/order').then( res => {
        return res.data.results.orders
    })
    return orders
})

const initialState = {
    orders: []
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchOrder.pending]: (state,action) => {
            state.status = 'loading'
        },
        [fetchOrder.fulfilled]: (state,action) => {
            state.status = 'success'
            state.orders = action.payload
        },
        [fetchOrder.pending]: (state,action) => {
            state.status = 'something went wrong'
        },
    }
})

export default orderSlice.reducer