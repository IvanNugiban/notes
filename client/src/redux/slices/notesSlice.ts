import {IReduxNote, SortTypes} from "../../types/NotesTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISearchedUser} from "../../types/ISearchedUser";

interface IInitialState {
    newNote: IReduxNote;
    page: number;
    sortType: SortTypes;
}

const initialState : IInitialState = {
    newNote: {
        background: "#FFFFFF",
        coAuthors: [] as ISearchedUser[],
        pined: false,
    },
    page: 1,
    sortType: "pined",
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setBackgroundInCreator(state, action: PayloadAction<string>) {
        state.newNote.background = action.payload;
        },
        setCoAuthorInCreator(state, action: PayloadAction<ISearchedUser>) {
             state.newNote.coAuthors.push(action.payload);
        },
        togglePushpinButtonInCreator(state) {
            state.newNote.pined = !state.newNote.pined;
        },
        deleteCoAuthorInCreator(state, action: PayloadAction<string>) {
            state.newNote.coAuthors = state.newNote.coAuthors.filter((author) => author.id != action.payload)
        },
        setDefaultNote(state) {
            state.newNote = initialState.newNote;
            state.page = 1;
        },
        setPage(state, action : PayloadAction<number>) {
            state.page = action.payload;
        },
        setTypeOfSorting(state, action: PayloadAction<SortTypes>) {
            state.sortType = action.payload;
        }
    }
})

export default notesSlice.reducer;
export const notesActions = notesSlice.actions;