import {Layout} from 'antd';
import React from 'react';
import RecentNotes from "./RecentNotes/RecentNotes";
import Notebook from "./Notebook/Notebook";

const Main = () => {
    return (
        <Layout.Content>
           <RecentNotes/>
            <Notebook/>
        </Layout.Content>
    );
};

export default Main;