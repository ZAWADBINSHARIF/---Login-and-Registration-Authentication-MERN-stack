// external import
import { configureStore } from '@reduxjs/toolkit' 

// internal import
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice'
import productReducer from './slices/productSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store