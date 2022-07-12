import {Col, Empty, Row, Skeleton, Typography} from 'antd';
import React, {useCallback} from 'react';
import {useGetNotesQuery} from "../../../../services/notesService";
import RecentNotesItem from "../RecentNotesItem/RecentNotesItem";
import {BookTwoTone} from "@ant-design/icons";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useTypedDispatch} from "../../../../redux/typedReduxHooks";
import redirectToNote from "../../../../utils/asyncActionCreators/redirectToNote";
import {IIncomingNotes} from "../../../../types/NotesGetterTypes";

const Main = styled(Row)`
  padding: 5px 5px 10px 5px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      background: #F2F2F2;
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #A4A4A4;
      border-radius: 10px;
    }
`

const AmountOfNotes = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h5 {
    margin-top: 15px;
  }
`

const NoteColumn = styled(Col)`
  position: relative;
  min-width: 250px;
  height: 300px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #faf8f8;
  box-shadow: 0 0 5px 1px #C0C2C2;

  &:hover {
    box-shadow: 0 0 5px 3px #C0C2C2;
  }
`

const RecentNotesMain = () => {
    const {data: notesData, isLoading, isError} = useGetNotesQuery({limit: 10, page: 1, sortType: "newest"});
    const dispatch = useTypedDispatch();
    const redirectToNoteCallback = useCallback((note : IIncomingNotes) => {
        dispatch(redirectToNote(note, "newest", 5));
    }, [notesData?.notes])
    if (isLoading) return <Skeleton/>
    if (isError || !notesData?.notes) return <Empty description="You don't have notes yet"/>;

    return (
        <Main id="recent-notes-main" wrap={false}>
            {notesData!.notes.map(note =>
                <Link to="/notes" key={note._id}>
                <NoteColumn onClick={() => redirectToNoteCallback(note)}>
                        <RecentNotesItem note={note}/>
                </NoteColumn>
                </Link>
            )}
            <Link to="/notes">
            <NoteColumn>
                    <AmountOfNotes>
                        <BookTwoTone style={{fontSize: "2.2em"}}/>
                        <Typography.Title level={5}>Notes ({notesData!.notes.length})</Typography.Title>
                    </AmountOfNotes>
            </NoteColumn>
            </Link>
        </Main>
    )
};

export default RecentNotesMain;