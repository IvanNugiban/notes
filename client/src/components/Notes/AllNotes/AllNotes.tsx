import React, {useRef} from 'react';
import {Empty, Row, Skeleton} from 'antd';
import {useGetNotesQuery} from "../../../services/notesService";
import PreviewNote from "./PreviewNote/PreviewNote";
import {useTypedSelector} from "../../../redux/typedReduxHooks";
import Pagination from '../../../ui/Pagination/Pagination';
import useActions from "../../../hooks/useActions";
import SortTypeSelector from "./SortTypeSelector/SortTypeSelector";
import NoteChanger from "./NoteChanger/NoteChanger";
import AllNotesRemover from "./AllNotesRemover/AllNotesRemover";

const AllNotes = () => {
    const {noteChanger, notes} = useTypedSelector(state => state);
    const limit = useRef(5);
    const {setPage, setTypeOfSorting} = useActions();
    const {data: notesData, isFetching,  isError} = useGetNotesQuery({limit: limit.current, page: notes.page, sortType: notes.sortType});

    if (isFetching) return <Skeleton/>;
    if (isError || !notesData?.notes) return <Empty description="No notes"/>;
    
    return (
        <div>
            <Row justify="space-between">
            <SortTypeSelector value={notes.sortType} callback={(value) => setTypeOfSorting(value)}/>
                <AllNotesRemover />
            </Row>
            {
                notesData!.notes.map(note =><React.Fragment key={note._id}><PreviewNote {...note} /></React.Fragment>)
            }
            <Pagination  current={notes.page} onChange={(page) => setPage(page)} total={notesData!.totalPages}/>
            {noteChanger.note.creator && <NoteChanger note={noteChanger.note} />}
        </div>
    );
};

export default AllNotes;