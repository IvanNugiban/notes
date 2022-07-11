import React from 'react';
import styled from "styled-components";
import {Button, Dropdown, Input, Layout, Row, Space} from "antd";
import {CaretDownFilled, DownOutlined, PlusCircleFilled} from "@ant-design/icons";
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
                <Space size="middle" direction="vertical">
                    <StyledDropdown trigger={['click']} overlay={<UserMenu/>}>
                        <Space>
                            {user.username}
                            <DownOutlined/>
                        </Space>
                    </StyledDropdown>
                    <Dropdown trigger={['click']} overlay={<UserMenu/>}>
                        <Input.Search enterButton placeholder="Search"/>
                    </Dropdown>
                    <Dropdown trigger={['click']} overlay={<UserMenu/>}>
                        <Button type="primary" shape="round" block>
                            <Row justify="space-between" align="middle">
                                <PlusCircleFilled/>
                                Create
                                <CaretDownFilled/>
                            </Row>
                        </Button>
                    </Dropdown>
                    <LinksMenu/>
                </Space>
            </StyledNavbar>
        </Wrapper>
    );
};

export default Navbar;