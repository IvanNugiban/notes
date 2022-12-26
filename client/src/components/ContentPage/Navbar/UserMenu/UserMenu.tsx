import React from 'react';
import {Menu} from "antd";
import useActions from "../../../../hooks/useActions";


const UserMenu = () => {
    const  {logoutUser} = useActions();


    return (
        <Menu  items={[{
            label: <div onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");
                sessionStorage.removeItem("loggedIn");
                logoutUser()
            }
            }>Logout</div>,
            key: 1,
        }]}/>
    );
};

export default UserMenu;