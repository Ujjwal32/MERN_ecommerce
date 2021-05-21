import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk('products/fetchProducts', async ()=> {
    const products = await axios.get('/products?page=1&limit=5').then( res => {
        return res.data.result
    })
    const category = await axios.get('/category').then( res => {
        return res.data.result
    })
    return {products,category}
})

export const postProducts = createAsyncThunk('products/postProducts', async (data)=> {
    const session = JSON.parse(sessionStorage.getItem('user-e-commerce'))
    const userToken = session && session.token
    const products = await axios.post('/products',data,{ headers: {
        "x-auth": userToken,
        "Content-Type": "application/json"
      }}).then(res => {
        if(res.data?.msg === 'Successfully added!'){
          window.location.href = '/admin/products'
        }
      }).catch(err => {
        console.log(err)
      })
    return products
})

export const addCategory = createAsyncThunk('category/added', async (name,{ rejectWithValue }) => {
    const session = JSON.parse(sessionStorage.getItem('user-e-commerce'))
    const userToken = session && session.token
    const category = await axios.post('/category',{name},{ headers: {
        "x-auth": userToken,
        "Content-Type": "application/json"
      }}).then(res => {
        if(res.data?.msg === 'Category added!'){
          window.location.href = '/admin/category'
        }
      }).catch(err => {
        console.log(err)
        return rejectWithValue([],err)
      })
    return category
})


export const placeOrder = createAsyncThunk('payment/verified',async (data) => {
    console.log(data)
    await axios.post('/order',data).then(res => {
        alert('Your order has been placed!')
        localStorage.removeItem('cart')
        window.location.href = '/'
    }).catch(err => {
        console.log(err)
    })
})

const initialState = {
    status: '',
    products: [],
    category: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducer: {

    },
    extraReducers: {
        [fetchProducts.pending]: (state,action) => {
            state.status = 'loading'
        },
        [fetchProducts.fulfilled]: (state,action) => {
            state.status = 'success'
            state.products = state.products.concat(action.payload.products)
            state.category = state.category.concat(action.payload.category)
        },
        [fetchProducts.rejected]: (state,action) => {
            state.status = 'failed'
            console.log(action.payload)
        },
        [postProducts.fulfilled]: (state,action) => {
            state.status = 'success'
            state.products = state.products.concat(action.payload)
        },
        [postProducts.rejected]: (state,action) => {
            state.status = 'failed'
            console.log(action.payload)
        },
        [addCategory.pending]: (state,action) => {
            state.status = 'loading'
        },
        [addCategory.fulfilled]: (state,action) => {
            state.status = 'success'
            state.category = state.category.concat(action.payload.category)
        },
        [addCategory.rejected]: (state,{payload,error}) => {
            state.status = 'failed'
            console.log(error)
        },
    }
})


export default productSlice.reducer