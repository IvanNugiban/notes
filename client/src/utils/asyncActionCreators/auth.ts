import {Action, Dispatch as ReduxDispatch} from "@reduxjs/toolkit";
import {Dispatch, SetStateAction} from "react";
import {IUserData} from "../../types/IUserAuth";
import axios from "axios";
import {authActions} from "../../redux/slices/authSlice";

function auth(setLoading: Dispatch<SetStateAction<boolean>>) {
    return async (dispatch: ReduxDispatch<Action>) => {
        try {
            const response: { data: IUserData } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/auth`, {
                withCredentials: false,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(authActions.loginUser(response.data))
            setLoading(false)
        } catch {
            localStorage.removeItem("token");
            sessionStorage.removeItem("loggedIn");
            setLoading(false)
        }
    }
}

export default auth;