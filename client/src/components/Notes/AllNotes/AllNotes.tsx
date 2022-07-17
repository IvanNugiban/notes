import React from 'react';
import {Empty, Row, Skeleton} from 'antd';
import PreviewNote from "./PreviewNote/PreviewNote";
import {useTypedSelector} from "../../../redux/typedReduxHooks";
import Pagination from '../../../ui/Pagination/Pagination';
import SortTypeSelector from "./SortTypeSelector/SortTypeSelector";
import NoteChanger from "./NoteChanger/NoteChanger";
import AllNotesRemover from "./AllNotesRemover/AllNotesRemover";
import {INotesData} from "../../../types/NotesGetterTypes";
import {SortTypes} from "../../../types/NotesTypes";

interface IProps {
    page: number;
    sortType: SortTypes;
    notesData: INotesData;
    isError: boolean;
    isFetching: boolean;
    setTypeOfSorting: (sortType: SortTypes) => void;
    setPage: (page: number) => void;
}

const AllNotes = ({page, sortType, notesData, isError, isFetching, setTypeOfSorting, setPage} : IProps) => {
    const {noteChanger, auth} = useTypedSelector(state => state);
    if (isFetching) return <Skeleton/>;
    if (isError || !notesData.notes) return <Empty description="No notes"/>;
    
    return (
        <div>
            <Row justify="space-between">
            <SortTypeSelector value={sortType} callback={(value) => setTypeOfSorting(value)}/>
                {notesData.notes[0].creator === auth.user.id && <AllNotesRemover />}
            </Row>
            {
                notesData.notes.map(note =><React.Fragment key={note._id}><PreviewNote {...note} /></React.Fragment>)
            }
            <Pagination  current={page} onChange={(page) => setPage(page)} total={notesData.totalPages}/>
            {noteChanger.note.creator && <NoteChanger note={noteChanger.note} />}
        </div>
    );
};

export default AllNotes;