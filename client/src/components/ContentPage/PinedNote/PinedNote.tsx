import React from 'react';
import {Typography} from "antd";
import {IIncomingNotes} from "../../../types/NotesGetterTypes";
import styled from "styled-components";
import {useTypedDispatch} from "../../../redux/typedReduxHooks";
import redirectToNote from "../../../utils/asyncActionCreators/redirectToNote";
import {Link} from "react-router-dom";

interface IProps {
    note: IIncomingNotes;
}


const Paragraph = styled(Typography.Paragraph)`
  color: white !important;
`

const PinedNote = ({note}: IProps) => {
    const dispatch = useTypedDispatch();

    function redirectToPinedNote() {
        dispatch(redirectToNote(note, "pined", 5))
    }

    return (
        <Link onClick={redirectToPinedNote} to='/notes'>
        <Paragraph>{note.title.length === 0 ? "No title" :
            note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title}
        </Paragraph>
        </Link>
    )
};

export default PinedNote;