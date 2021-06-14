import  { configureStore } from "@reduxjs/toolkit"
import productReducer from './features/productSlice'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import orderReducer from './features/orderSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer
    }
})
export default store