import {Layout} from 'antd';
import React from 'react';
import Navbar from "./Navbar/Navbar";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Content from "./Content/Content";

const ContentPage = () => {
    const {width} = useWindowDimensions();
    
    return (
        <Layout >
            {width < 800 ? <BurgerMenu/> : <Navbar/>} {/*Checks if width fits navbar, otherwise displays hamburger menu*/}
            <Content/>
        </Layout>
    );
};

export default ContentPage;