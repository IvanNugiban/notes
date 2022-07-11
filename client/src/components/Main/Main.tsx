import {Col, Row} from 'antd';
import React from 'react';
import RecentNotes from "./RecentNotes/RecentNotes";

const Main = () => {
    return (
        <Row gutter={[30, 30]} wrap>
           <RecentNotes/>
            <Col flex={1}>
                fafaf
            </Col>
        </Row>
    );
};

export default Main;