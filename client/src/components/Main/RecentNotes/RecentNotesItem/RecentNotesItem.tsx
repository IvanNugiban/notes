import React from 'react';
import {Typography} from "antd";
import {IIncomingNotes} from "../../../../types/NotesGetterTypes";
import styled from "styled-components";
import {PushpinFilled} from "@ant-design/icons";

interface IProps {
    note: IIncomingNotes
}

const PinedIcon = styled(PushpinFilled)`
  position: absolute;
  font-size: 1.2em;
  right: 20px;
  bottom: 10px;
`

const RecentNotesItem = ({note}: IProps) => {
    return (
        <div>
            <Typography.Title level={3}>{note.title.length === 0 ? "No title" : note.title}</Typography.Title>
            <Typography.Paragraph>{note.text.length === 0 ? "No text" :
                (note.text.length > 180) ? `${note.text.slice(0, 180)}...` : note.text
            }</Typography.Paragraph>
            {note.pined && <PinedIcon/>}
        </div>
    );
};

export default RecentNotesItem;