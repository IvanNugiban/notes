import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import PagesRoutes from "./routes/PagesRoutes";
import useActions from "./hooks/useActions";
import {useTypedDispatch} from "./redux/typedReduxHooks";
import auth from "./utils/asyncActionCreators/auth";
import 'antd/dist/antd.css';
import Loader from "./ui/Loader/Loader";
import "./App.css"

function App() {
    const dispatch = useTypedDispatch();
    const [isLoading, setLoading] = useState(true);
    const {loginUser} = useActions();

    useEffect(() => {
        const loggedInLocal = sessionStorage.getItem("loggedIn");
        if (loggedInLocal) {
            loginUser(JSON.parse(loggedInLocal));
            setLoading(false);
        }
      else dispatch(auth(setLoading))
    }, [])

    if (isLoading) return <Loader/>

    return (
        <BrowserRouter>
                <PagesRoutes/>
        </BrowserRouter>
    );
}

export default App;
