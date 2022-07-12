import React from 'react';
import {Col} from "antd";
import styled from "styled-components";
import RecentNotesMain from "./RecentNotesMain/RecentNotesMain";
import RecentNotesHeader from "./RecentNotesHeader/RecentNotesHeader";

const StyledRecentNotes = styled.div`
  padding: 10px;
  background-color: #F2F2F2;
  border-radius: 5px;
`

const RecentNotes = () => {
    return (
        <StyledRecentNotes >
            <RecentNotesHeader/>
            <RecentNotesMain/>
        </StyledRecentNotes>
    );
};

export default RecentNotes;