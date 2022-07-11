import React from 'react';
import {Avatar, Layout, Menu, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import styled from "styled-components";

const ConditionalTitle = styled(Typography.Title)`
    @media screen and (max-width: 450px) {
     display: none;
    }
`

const ConditionalMenu = styled(Menu)`
    padding-right: 5px;
  @media screen and (max-width: 450px) {
   padding-right: 0;
  }
`

const Header = () => {
    return (
        <Layout.Header  >
            <Row justify="space-between" align="middle">
                <Avatar size={50} shape="square" src='https://logodesign.business/wp-content/uploads/2019/12/App_logos14.jpg'/>
                <ConditionalTitle level={2} italic style={{color: "white", paddingTop: 10}}>Notes</ConditionalTitle>
                <ConditionalMenu items = {[{
                    label: <Link to="/login">Login</Link>,
                    key: 1
                },{
                    label: <Link to="/registration">Registration</Link>,
                    key: 2
                }
                ]} theme="dark"  selectable={false} mode="horizontal"/>
            </Row>
        </Layout.Header>
    );
};

export default Header;