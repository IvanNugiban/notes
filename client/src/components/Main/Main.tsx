import {Col, Layout, Row} from 'antd';
import React from 'react';
import RecentNotes from "./RecentNotes/RecentNotes";

const Main = () => {
    return (
        <Layout.Content>
           <RecentNotes/>
            <span>Notebook</span>
        </Layout.Content>
    );
};

export default Main;