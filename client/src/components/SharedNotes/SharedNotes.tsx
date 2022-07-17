import {Empty, PageHeader, Skeleton, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useGetSharedNotesQuery} from "../../services/notesService";
import styled from "styled-components";
import SharedNotesList from "./SharedNotesList/SharedNotesList";
import {ISharedData, ISharedNotes} from "../../types/NotesGetterTypes";
import AllSharedNotes from "./AllSharedNotes/AllSharedNotes";
import {ISearchedUser} from "../../types/ISearchedUser";

const Title = styled(Typography.Title)`
  margin-bottom: 20px !important;
`

const SharedNotes = () => {
    const [page, setPage] = useState(1);
    const [creator, setCreator] = useState<ISearchedUser| undefined>(undefined)
    const [notes, setNotes] = useState<ISharedNotes>({
        data: [] as ISharedData[],
        totalPages: 1
    } as ISharedNotes);
    const {data: sharedNotes, isLoading, isFetching, isError} = useGetSharedNotesQuery({limit: 2, page, pageLimit: 2 }, {
        pollingInterval: 60000
    });

    useEffect(() => {
        if (!sharedNotes || isFetching || isError) return;
        setNotes((prevNote) =>({
            data: [...prevNote.data, ...sharedNotes.data],
            totalPages: sharedNotes.totalPages
        }))
    }, [sharedNotes])

    if(isLoading || notes.data.length === 0 ) return <Skeleton/>

    return (
        <div>
            {creator && <PageHeader onBack={() => setCreator(undefined)} title="Go back"/>}
            <Title level={4}>{creator ? `${creator.username}'s notes` : "Shared with you"}</Title>
            {isError ? <Empty description="No one has shared notes with you"/> : creator ? <AllSharedNotes creator={creator}/> :
                <SharedNotesList page={page} setPage={setPage} onMore={(creator) => setCreator(creator)} isFetching={isFetching} sharedNotes={notes}/>}
        </div>
    );
};

export default SharedNotes;