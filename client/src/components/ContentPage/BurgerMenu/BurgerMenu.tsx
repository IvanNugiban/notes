import React from 'react';
import {slide as Menu} from "react-burger-menu"
import useActions from '../../../hooks/useActions';
import LinksMenu from "../LinksMenu/LinksMenu";
import Navbar from '../Navbar/Navbar';
import "./BurgerMenu.css"
import {Button, Row, Space} from "antd";
import {useTypedSelector} from "../../../redux/typedReduxHooks";

const BurgerMenu = () => {
    const username = useTypedSelector(state => state.auth.user.username)
    const {logoutUser} = useActions();
    return (
        <Menu right>
            <LinksMenu/>
            <Button onClick={logoutUser} block ghost danger>Log out {username}</Button>
        </Menu>
    );
};

export default BurgerMenu;