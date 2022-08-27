import {Empty, PageHeader, Skeleton, Typography} from 'antd';
import React, {useState} from 'react';
import {useGetSharedNotesQuery} from "../../services/notesService";
import styled from "styled-components";
import SharedNotesList from "./SharedNotesList/SharedNotesList";
import AllSharedNotes from "./AllSharedNotes/AllSharedNotes";
import {ISearchedUser} from "../../types/ISearchedUser";

const Title = styled(Typography.Title)`
  margin-bottom: 20px !important;
`

const SharedNotes = () => {
    const [page, setPage] = useState(1);
    const [creator, setCreator] = useState<ISearchedUser| undefined>(undefined)
    const {data: sharedNotes, isLoading, isFetching, isError} = useGetSharedNotesQuery({limit: 2, page, pageLimit: 2 }, {
        pollingInterval: 60000
    });


    if(isLoading) return <Skeleton/>

    return (
        <div>
            {creator && <PageHeader onBack={() => setCreator(undefined)} title="Go back"/>}
            <Title level={4}>{creator ? `${creator.username}'s notes` : "Shared with you"}</Title>
            {isError ? <Empty description="No one has shared notes with you"/> : creator ? <AllSharedNotes creator={creator}/> :
                <SharedNotesList page={page} setPage={setPage} onMore={(creator) => setCreator(creator)} isFetching={isFetching} sharedNotes={sharedNotes!}/>}
        </div>
    );
};

export default SharedNotes;