import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {ILoggedInUser, IUser, IUserLogin} from '../types/IUserAuth'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://fast-shelf-71286.herokuapp.com/api/auth"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation<ILoggedInUser, IUserLogin>({
            query: (user: IUserLogin) => ({
                url: "/login",
                method: "POST",
                body: user,

            })
        }),
        registerUser: builder.mutation<string, IUser>({
            query: (user: IUser) => ({
                url: "/registration",
                method: "POST",
                body: user,
            })
        }),
    })
})


export const {useLoginUserMutation, useRegisterUserMutation} = authApi;