// internal import
import { apiSlice } from "./apiSlice"

const PRODUCTS_URL = 'https://dummyjson.com/products'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'GET'
            })
        })
    })
})

export const { useGetProductsMutation } = productApiSlice