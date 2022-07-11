import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "../services/authService";
import authSlice from "./slices/authSlice";
import notesSlice from "./slices/notesSlice";
import {notesApi} from "../services/notesService";
import changerOfNotes from "./slices/noteChangerSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [notesApi.reducerPath]: notesApi.reducer,
        auth: authSlice,
        notes: notesSlice,
        noteChanger: changerOfNotes
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, notesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch