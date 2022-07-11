import React from 'react';
import {Card, Typography} from "antd";
import styled from "styled-components";
import {PushpinFilled} from "@ant-design/icons";
import Moment from "react-moment";
import PreviewNoteMenu from './PreviewNoteMenu/PreviewNoteMenu';
import {IIncomingNotes} from "../../../../types/NotesGetterTypes";

const Note = styled(Card)`
  position: relative;
  margin: 20px 0;
  box-shadow: 0 0 5px 3px #C0C2C2;

  * {
    color: #ababab;
    mix-blend-mode: difference;
  }
`

const PinedIcon = styled(PushpinFilled)`
  position: absolute;
  font-size: 1.2em;
  right: 20px;
  bottom: 10px;
`

const CreatedAt = styled(Typography.Title)`
  position: absolute;
  left: 10px;
  bottom: -2px;
  &.ant-typography,
  *{
    color: #565656;
  }
`

const PreviewNote = (note: IIncomingNotes) => {
    return (
        <Note extra={<PreviewNoteMenu note={note}/>} headStyle={{mixBlendMode: "difference"}} style={{background: note.background}} title={note.title.length === 0 ? "No title" : note.title }>
            <Typography.Paragraph>{note.text}</Typography.Paragraph>
            {note.pined && <PinedIcon/>}
            <CreatedAt level={5}>Created on <Moment format="DD/MM/YYYY" >{new Date(note.createdOn)}</Moment></CreatedAt>
        </Note>
    );
};

export default PreviewNote;