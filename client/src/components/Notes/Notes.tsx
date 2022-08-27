import React from 'react';
import NoteCreator from "./NoteCreator/NoteCreator";
import AllNotes from "./AllNotes/AllNotes";
import {useTypedSelector} from "../../redux/typedReduxHooks";
import useActions from "../../hooks/useActions";
import {useGetNotesQuery} from "../../services/notesService";

const Notes = () => {
    const {noteChanger, notes, auth} = useTypedSelector(state => state);
    const {setPage, setTypeOfSorting} = useActions();
    const {data: notesData, isFetching, isError} = useGetNotesQuery({
        userId: auth.user.id,
        limit: 5,
        page: notes.page,
        sortType: notes.sortType
    });

    return (
        <div>
            <NoteCreator/>
            <AllNotes sortType={notes.sortType} page={notes.page} notesData={notesData!}
                      isError={isError} isFetching={isFetching}
                      setTypeOfSorting={(typeOfSorting) => setTypeOfSorting(typeOfSorting)}
                      setPage={(page) => setPage(page)}
            />
        </div>
    );
};

export default Notes;