import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useTypedSelector} from "../redux/typedReduxHooks";
import Main from "../components/Main/Main";
import Notes from "../components/Notes/Notes"

const ContentRoutes = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    return (
        <Routes>
            {isAuth && <>
                <Route path='/main' element={<Main/>} />
                <Route path='/notes' element={<Notes/>} />
                <Route path='/share' element={<span>faf</span>}/>
                <Route path='*' element={<Navigate replace to={'/main'}/>}/>
            </>
            }

        </Routes>
    );
};

export default ContentRoutes;