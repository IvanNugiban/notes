import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IncomingUserData, ISearchedUser} from "../types/ISearchedUser";
import {IChangedNote, INote, INoteCreator, INoteId} from "../types/NotesTypes";
import {GetNotesParams, INotesData, IPinedNotes, ISharedNotes, ISharedParams} from "../types/NotesGetterTypes";

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_SERVER_URL}/api/notes`}),
    tagTypes: ["Notes", "Pined", "Shared"],
    endpoints: (builder) => ({
        getNotes: builder.query<INotesData, GetNotesParams>({
            query: (params: GetNotesParams) => ({
                url: "/get",
                params
            }),
            providesTags: ["Notes"],
            keepUnusedDataFor: 10
        }),
        getPinedNotes: builder.query<IPinedNotes, { limit: number }>({
            query: ({limit}: { limit: number }) => ({
                url: "/getPined",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {
                    limit
                }
            }),
            providesTags: ["Pined"],
            keepUnusedDataFor: 10,
        }),
        getSharedNotes: builder.query<ISharedNotes, ISharedParams>({
            query: (options : ISharedParams) => ({
                url: "/getShared",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {...options}
            }),
            providesTags: ["Shared"],
            keepUnusedDataFor: 10,
        }),
        findUser: builder.mutation<ISearchedUser, IncomingUserData>({
            query: (data: IncomingUserData) => ({
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
            invalidatesTags: ["Notes", "Pined"]
        }),
        changeNote: builder.mutation<void, IChangedNote>({
            query: (note: IChangedNote) => ({
                url: "/change",
                method: 'PUT',
                body: note
            }),
            invalidatesTags: ["Notes", "Pined", "Shared"]
        }),
        deleteNote: builder.mutation<void, INoteId>({
            query: (id: INoteId) => ({
                url: "/deleteOne",
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Notes", "Pined"]
        }),
        deleteAllNotes: builder.mutation<void, INoteCreator>({
            query: (creator: INoteCreator) => ({
                url: "/deleteAll",
                method: "DELETE",
                body: creator
            }),
            invalidatesTags: ["Notes", "Pined"]
        })
    })
})

export const {
    useGetNotesQuery,
    useGetPinedNotesQuery,
    useGetSharedNotesQuery,
    useFindUserMutation,
    useAddNoteMutation,
    useChangeNoteMutation,
    useDeleteNoteMutation,
    useDeleteAllNotesMutation
} = notesApi;