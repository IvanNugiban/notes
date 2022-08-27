import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIncomingNotes} from "../../types/NotesGetterTypes";
import {ISearchedUser} from "../../types/ISearchedUser";
import {ILastChanged} from "../../types/NotesTypes";

interface IInitialState {
    note: IIncomingNotes
}

const initialState: IInitialState = {
    note: {
        _id: "",
        text: "",
        title: "",
        lastChanged: {} as ILastChanged,
        createdOn: "",
        creator: "",
        background: "#FFFFFF",
        pined: false,
        coAuthors: [] as ISearchedUser[]
    }
}

const noteChangerSlice = createSlice({
    name: "noteChanger",
    initialState,
    reducers: {
        openNoteChanger(state, action: PayloadAction<IIncomingNotes>) {
            state.note = action.payload;
        },
        closeNoteChanger(state) {
            state.note = initialState.note;
        },
        togglePushpinInChanger(state) {
            state.note.pined = !state.note.pined;
        },
        setBackgroundInChanger(state, action : PayloadAction<string>) {
            state.note.background = action.payload;
        },
        setCoAuthorInChanger(state, action: PayloadAction<ISearchedUser>) {
            state.note.coAuthors.push(action.payload);
        },
        deleteCoAuthorInChanger(state, action: PayloadAction<string>) {
            state.note.coAuthors = state.note.coAuthors.filter((author) => author.id != action.payload)
        },
    }
})

export default noteChangerSlice.reducer;
export const noteChangerActions = noteChangerSlice.actions;