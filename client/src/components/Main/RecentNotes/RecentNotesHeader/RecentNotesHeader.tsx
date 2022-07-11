import {Popover, Row, Typography} from 'antd';
import React from 'react';
import {Link} from "react-router-dom";
import {PlusOutlined, RightOutlined} from "@ant-design/icons";
import styled from "styled-components";

const LinkToNotes = styled(Link)`
  display: flex;
  align-items: center;
  h5 {
    margin: 0 5px 0 0;
  }
`

const RightArrow = styled(RightOutlined)`
  font-size: 0.9em;
  color: #50C36E;
`


const RecentNotesHeader = () => {
    return (
        <Row justify="space-between">
            <LinkToNotes to="/notes">
                <Typography.Title level={5}>NOTES</Typography.Title>
                <RightArrow/>
            </LinkToNotes>
            <Popover content="Create new note">
                <Link to="/notes">
                    <PlusOutlined />
                </Link>
            </Popover>
        </Row>
    );
};

export default RecentNotesHeader;