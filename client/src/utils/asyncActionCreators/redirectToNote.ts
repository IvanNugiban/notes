import {Action, Dispatch} from "@reduxjs/toolkit";
import {SortTypes} from "../../types/NotesTypes";
import axios, { AxiosResponse } from "axios";
import {notesActions} from "../../redux/slices/notesSlice";
import {noteChangerActions} from "../../redux/slices/noteChangerSlice";
import {IIncomingNotes} from "../../types/NotesGetterTypes";

function redirectToNote(note: IIncomingNotes, sortType: SortTypes, limit: number) {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const page: AxiosResponse<number> = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notes/getNotePage`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}, params: {
                    noteId: note._id,
                    sortType,
                    limit
                }
            });
            dispatch(notesActions.setPage(page.data));
            dispatch(notesActions.setTypeOfSorting(sortType));
            dispatch(noteChangerActions.openNoteChanger(note));
        }
        catch (e) {
            alert(e);
        }
    }
}

export default redirectToNote;