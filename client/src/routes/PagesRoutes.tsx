import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../components/WelcomePage/LoginPage/LoginPage";
import {useTypedSelector} from "../redux/typedReduxHooks";
import RegisterPage from "../components/WelcomePage/RegisterPage/RegisterPage";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import ContentPage from "../components/ContentPage/ContentPage";

const PagesRoutes = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    return (
        <>
            {!isAuth ?
                <Routes>
                    <Route path="/welcome" element={<WelcomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/registration" element={<RegisterPage/>}/>
                    <Route path='*' element={<Navigate replace to={'/welcome'}/>}/>
                </Routes>
                : <ContentPage/>
            }
        </>
    );
};

export default PagesRoutes;