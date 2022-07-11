import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IncomingUserData, ISearchedUser} from "../types/ISearchedUser";
import {IChangedNote, INote, INoteCreator, INoteId} from "../types/NotesTypes";
import {GetNotesParams, INotesData} from "../types/NotesGetterTypes";

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/notes"}),
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        getNotes: builder.query<INotesData, GetNotesParams>({
            query: ({limit, page, sortType} : GetNotesParams ) => ({
                url: "/get",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {
                    limit,
                    page,
                    sortType
                }
            }),
            providesTags: result => ["Notes"],
            keepUnusedDataFor: 10
        }),
        findUser: builder.mutation<ISearchedUser,IncomingUserData>({
            query: (data : IncomingUserData ) => ({
                url: "/findUser",
                method: "POST",
                body: data
            })
        }),
        addNote: builder.mutation<void, INote>({
            query: (note: INote) => ({
                url: "/add",
                method: "POST",
                body: note,
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            }),
            invalidatesTags: ["Notes"]
        }),
        changeNote: builder.mutation<void, IChangedNote>({
            query: (note: IChangedNote) => ({
                url: "/change",
                method: 'PUT',
                body: note
            }),
            invalidatesTags: ["Notes"]
        }),
        deleteNote: builder.mutation<void, INoteId>({
            query: (id: INoteId) => ({
                url: "/deleteOne",
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Notes"]
        }),
        deleteAllNotes: builder.mutation<void, INoteCreator>({
            query: (creator: INoteCreator) => ({
                url: "/deleteAll",
                method: "DELETE",
                body: creator
            }),
            invalidatesTags: ["Notes"]
        })
    })
})

export const {useFindUserMutation, useAddNoteMutation, useChangeNoteMutation, useDeleteNoteMutation, useGetNotesQuery, useDeleteAllNotesMutation} = notesApi;