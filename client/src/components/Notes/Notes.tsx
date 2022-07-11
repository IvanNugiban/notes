import React from 'react';
import NoteCreator from "./NoteCreator/NoteCreator";
import AllNotes from "./AllNotes/AllNotes";

const Notes = () => {
    return (
        <div>
            <NoteCreator/>
            <AllNotes/>
        </div>
    );
};

export default Notes;