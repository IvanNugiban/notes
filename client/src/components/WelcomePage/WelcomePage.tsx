import React, {useEffect, useState} from 'react';
import {Button, Col, Layout, Row, Typography} from 'antd';
import Header from "./Header/Header";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Loader from "../../ui/Loader/Loader";

const StyledLayoutContent = styled(Layout.Content)`
  height: calc(100vh - 64px);
  padding: 10px;
  background-color: #F7EF3E;
`

const StyledCol = styled(Col) `
max-width: 500px;
text-align: center;
`

const WelcomePage = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => setLoading(false), []);
    if (loading) return <Loader/>
    return (
        <Layout>
            <Header/>
            <StyledLayoutContent>
                <Row style={{height: "100%"}} justify="center" align="middle">
                    <StyledCol>
                        <Typography.Title className="whiteColor" level={1}>Notes app</Typography.Title>
                        <Typography.Title  level={3} >This app has everything to put things in order in life - it's convenient to save information and work with text, plan tasks, share your notes with other and quickly find what you need at the right time.</Typography.Title>
                        <Button  type="primary"><Link to="/login">Start</Link></Button>
                    </StyledCol>
                </Row>
            </StyledLayoutContent>
        </Layout>
    );
};

export default WelcomePage;