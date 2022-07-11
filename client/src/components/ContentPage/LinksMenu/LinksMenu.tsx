import React from 'react';
import {Menu, Space} from 'antd'
import {HomeOutlined, PushpinOutlined, RestOutlined, SnippetsOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const StyledLinksMenu = styled(Menu)`
  background-color: transparent !important;
 border: transparent;
  a,
  .ant-menu-item {
    color: white
  };
  .ant-menu-item:hover {
    color: #196AD9;
  }
`

const LinksMenu = () => {

    const menuItems = [
        {
            label: <Space>
                <HomeOutlined />
                <Link  to={"/main"}>Main</Link>
            </Space>,
            key: 1
        },
        {
            label: <Space>
                <PushpinOutlined />
               Pined
            </Space>,
            key: 2
        },
        {
            label: <Space>
                <SnippetsOutlined />
                <Link to={"/notes"}>Notes</Link>
            </Space>,
            key: 3
        },
        {
            label: <Space>
                <UserOutlined />
                <Link to={"/share"}>Shared</Link>
            </Space>,
            key: 4
        },
       
    ]

    return (
        <StyledLinksMenu selectable={false} theme="dark" items={menuItems}  mode="vertical"/>
    );
};

export default LinksMenu;