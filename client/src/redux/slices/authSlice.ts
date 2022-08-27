import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserData} from "../../types/IUserAuth";

interface IInitialState {
    isAuth: boolean,
    user: IUserData
}

const initialState : IInitialState = {
    isAuth: false,
    user: {} as IUserData
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<IUserData>) {
            state.isAuth = true;
            state.user = action.payload;
        },
        logoutUser(state) {
            state.isAuth = false;
            state.user = {} as IUserData;
        }
    }
})

export default userSlice.reducer;
export const authActions = userSlice.actions;