import React, {useRef} from 'react';
import styled from "styled-components";
import useOutsideClickDetector from "../../../../hooks/useOutsideClickDetector";
import {useTypedSelector} from "../../../../redux/typedReduxHooks";
import UserSearch from "./UserSearch/UserSearch";
import ListOfAuthors from "./ListOfAuthors/ListOfAuthors";
import {ISearchedUser} from "../../../../types/ISearchedUser";

interface IProps {
    closeWindow: () => void;
    coAuthors: ISearchedUser[];
    setCoAuthor: (user: ISearchedUser) => void;
    deleteCoAuthor: (userId : string) => void;
    creator?: string;
}

const StyledNoteShare = styled.div`
  position: absolute;
  left: -20px;
  top: 30px;
  z-index: 999;
  width: 35vw;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #C0C2C2;
  @media screen and (max-width: 500px) {
    width: 45vw;
  }
`

const NoteShare = ({closeWindow, coAuthors, setCoAuthor, deleteCoAuthor, creator }: IProps) => {
    const author = useTypedSelector(state => state.auth.user.username);
    const NoteShareElement = useRef<HTMLDivElement>(null);
    useOutsideClickDetector(NoteShareElement, closeWindow)
    return (
        <StyledNoteShare ref={NoteShareElement}>
            <UserSearch coAuthors={coAuthors} setCoAuthor={setCoAuthor} author={author}/>
            <ListOfAuthors creator={creator} coAuthors={coAuthors} deleteCoAuthor={deleteCoAuthor} author={author}/>
        </StyledNoteShare>
    );
};

export default NoteShare;