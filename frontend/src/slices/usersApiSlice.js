// internal import
import { apiSlice } from "./apiSlice";

const USERS_URL = '/users'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        registration: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/registration`,
                method: 'POST',
                body: data
            })
        }),
        profileUpdate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
    useProfileUpdateMutation } = usersApiSlice