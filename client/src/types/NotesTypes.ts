import {ISearchedUser} from "./ISearchedUser";

export interface IReduxNote  {
    coAuthors: ISearchedUser[];
    background: string;
    pined: boolean;
}

export interface ILastChanged {
    date:string;
    author: string;
}

export interface INote extends IReduxNote {
    text: string;
    title: string;
    lastChanged: ILastChanged
}

export interface INoteId {
    id: string;
}

export interface INoteCreator {
    creator: string;
}

export interface IChangedNote {
    id: string;
    text: string;
    title: string;
    pined: boolean;
    background: string;
    coAuthors: ISearchedUser[];
    lastChanged: ILastChanged;
}

export type SortTypes = "pined" | "lastChange" | "newest" | "oldest";

