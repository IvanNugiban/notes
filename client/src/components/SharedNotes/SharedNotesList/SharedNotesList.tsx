import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {Button, List, Skeleton, Typography} from 'antd';
import {ISharedNotes} from "../../../types/NotesGetterTypes";
import PreviewNote from "../../Notes/AllNotes/PreviewNote/PreviewNote";
import styled from "styled-components";
import NoteChanger from "../../Notes/AllNotes/NoteChanger/NoteChanger";
import {useTypedSelector} from "../../../redux/typedReduxHooks";
import {ISearchedUser} from "../../../types/ISearchedUser";

interface IProps {
    sharedNotes: ISharedNotes;
    isFetching: boolean;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    onMore: (creator: ISearchedUser) => void;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const IndicatorOfVisibility = styled.div`
    height: 1px;
`

const CreatorNameTitle = styled(Typography.Title)`
  text-align: center;
`

const SharedNotesList = ({sharedNotes, isFetching, onMore, page, setPage}: IProps) => {
    const {note} = useTypedSelector(state => state.noteChanger);
    const observer = useRef<IntersectionObserver>();
    const observableElement = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        if (!observableElement.current || sharedNotes.totalPages < page || isFetching) return;
        
        function observerCallback([entry] : IntersectionObserverEntry[]) {
           if(entry.isIntersecting) setPage((prevPage) => prevPage + 1);
        }
        observer.current = new IntersectionObserver(observerCallback);
        observer.current.observe(observableElement.current)
    }, [isFetching])

    return (
        <>
        <List dataSource={sharedNotes.data} renderItem={sharedNote => (<List.Item>
            <Wrapper>
                <CreatorNameTitle level={3}>{`${sharedNote.creator.username}'s notes`}</CreatorNameTitle>
                {sharedNote.notes.map(note => <PreviewNote key={note._id} {...note}/>)}
                {sharedNote.isMoreNotes && <Button onClick={() => onMore(sharedNote.creator)}>View more</Button>}
                {note.creator === sharedNote.creator.id && <NoteChanger creator={sharedNote.creator.username} note={note} />}
            </Wrapper>
        </List.Item>)}/>
            {isFetching && <Skeleton/>}
            <IndicatorOfVisibility ref={observableElement} />
        </>
    )
};

export default SharedNotesList;