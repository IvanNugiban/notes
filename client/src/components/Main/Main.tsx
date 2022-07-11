import {Col, Row} from 'antd';
import React from 'react';
import styled from "styled-components";

const RecentNotes = styled(Col)`
  background-color: #6BD2E2;
  border-radius: 5px;
`

const Main = () => {
    return (
        <Row gutter={[30, 30]} wrap>
            <RecentNotes  flex={3}>
                ffa
            </RecentNotes>
            <Col flex={1}>
                fafaf
            </Col>
        </Row>
    );
};

export default Main;