import React, {useState} from 'react';
import {slide as Menu} from "react-burger-menu"
import useActions from '../../../hooks/useActions';
import LinksMenu from "../LinksMenu/LinksMenu";
import "./BurgerMenu.css"
import {Button} from "antd";
import {useTypedSelector} from "../../../redux/typedReduxHooks";

const BurgerMenu = () => {
    const username = useTypedSelector(state => state.auth.user.username);
    const [openState, setOpenState] = useState(false);
    const {logoutUser} = useActions();



    return (
        <Menu isOpen={openState} onStateChange={(state) => setOpenState(state.isOpen)}  right>
            <LinksMenu callback={() => setOpenState(false)}/>
            <Button  onClick={logoutUser} block ghost danger>Log out {username}</Button>
        </Menu>
    );
};

export default BurgerMenu;