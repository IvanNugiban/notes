import {ILastChanged, INote, SortTypes} from "./NotesTypes";

export interface IIncomingNotes extends INote {
    _id: string;
    lastChanged: ILastChanged;
    creator: string;
    createdOn: string;
}

export interface INotesData {
    notes: IIncomingNotes[],
    totalPages: number;
}

export type GetNotesParams = {
    limit: number,
    page: number;
    sortType: SortTypes
}