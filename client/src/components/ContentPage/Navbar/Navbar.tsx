import React from 'react';
import styled from "styled-components";
import {Dropdown, Layout, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import UserMenu from "./UserMenu/UserMenu";
import {useTypedSelector} from "../../../redux/typedReduxHooks";
import LinksMenu from "../LinksMenu/LinksMenu";

const Wrapper = styled.div`
  position: relative;
  width: 220px;
`

const StyledNavbar = styled(Layout.Sider)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #1A1A1A;
  padding: 15px;
`

const StyledDropdown = styled(Dropdown)`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #CCCCCC;
`


const Navbar = () => {
    const user = useTypedSelector(state => state.auth.user);
    return (
        <Wrapper>
            <StyledNavbar width={220}>
                    <StyledDropdown trigger={['click']} overlay={<UserMenu/>}>
                        <Space align="center">
                            <span>{user.username}</span>
                            <DownOutlined/>
                        </Space>
                    </StyledDropdown>
                    <LinksMenu/>
            </StyledNavbar>
        </Wrapper>
    );
};

export default Navbar;