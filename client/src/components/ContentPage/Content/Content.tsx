import React from 'react';
import {Layout} from "antd";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import ContentRoutes from "../../../routes/ContentRoutes";

const StyledContent = styled.div`
  min-height: calc(100vh - 60px);
  padding: 40px;
  background-color: white;
  @media screen and (max-width: 720px) {
    padding: 20px;
  }
`

const Content = () => {
    return (
        <Layout.Content>
            <StyledContent>
                <ContentRoutes/>
            </StyledContent>
            <Footer/>
        </Layout.Content>
    );
};

export default Content;