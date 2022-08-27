import {Action, Dispatch} from "@reduxjs/toolkit";
import {authActions} from "../../redux/slices/authSlice";
import {IUserData} from "../../types/IUserAuth";
import {NavigateFunction} from "react-router-dom";

function login(user : IUserData, navigate : NavigateFunction ) {
    return async (dispatch: Dispatch<Action>) => {
    dispatch(authActions.loginUser({
        username: user.username,
        id: user.id,
        email: user.email
    }))
        navigate("/main", {replace: true})
    }
}

export default login;