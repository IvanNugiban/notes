import React, {useState} from 'react';
import AllNotes from "../../Notes/AllNotes/AllNotes";
import {useGetNotesQuery} from "../../../services/notesService";
import {SortTypes} from "../../../types/NotesTypes";
import {ISearchedUser} from "../../../types/ISearchedUser";
import {useTypedSelector} from "../../../redux/typedReduxHooks";

interface IProps {
    creator: ISearchedUser;
}

const AllSharedNotes = ({creator} : IProps) => {
    const [sortType, setTypeOfSorting] = useState<SortTypes>("pined");
    const coAuthorId = useTypedSelector(state => state.auth.user.id);
    const [page, setPage] = useState<number>(1);
    const {data: notesData, isFetching, isError} = useGetNotesQuery({
        userId: creator.id,
        coAuthorId,
        limit: 5,
        page,
        sortType
    })

    return  <AllNotes sortType={sortType} page={page} notesData={notesData!}
                         isError={isError} isFetching={isFetching}
                         setTypeOfSorting={(typeOfSorting) => setTypeOfSorting(typeOfSorting)}
                         setPage={(page) => setPage(page)}
    />
};

export default AllSharedNotes;