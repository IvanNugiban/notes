import React from 'react';
import {Layout} from "antd";
import styled from 'styled-components';

const StyledFooter = styled(Layout.Footer)`
  height: 60px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = () => {
    return (
        <StyledFooter >
            Created by IvanNugiban in 2022
        </StyledFooter>
    );
};

export default Footer;