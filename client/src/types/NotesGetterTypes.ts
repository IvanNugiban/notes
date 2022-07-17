import {ILastChanged, INote, SortTypes} from "./NotesTypes";
import {ISearchedUser} from "./ISearchedUser";

export interface IIncomingNotes extends INote {
    _id: string;
    lastChanged: ILastChanged;
    creator: string;
    createdOn: string;
}

export interface INotesData {
    notes: IIncomingNotes[];
    totalPages: number;
}

export type GetNotesParams = {
    userId: string;
    coAuthorId?: string;
    limit: number,
    page: number;
    sortType: SortTypes
}

export interface IPinedNotes {
    notes: IIncomingNotes[];
    isMoreNotes: boolean;
}

export interface ISharedParams {
    limit: number;
    page: number;
    pageLimit: number;
}

export interface ISharedData { creator: ISearchedUser;
    notes: IIncomingNotes[];
    isMoreNotes: boolean;
}

export interface ISharedNotes {
    data: ISharedData[];
    totalPages: number;
}