import React, {useState} from 'react';
import {Alert, Input} from "antd";
import useInput from "../../../../../hooks/useInput";
import {useFindUserMutation} from "../../../../../services/notesService";
import styled from 'styled-components';
import {ISearchedUser} from "../../../../../types/ISearchedUser";

interface IProps {
    author: string;
    coAuthors: ISearchedUser[];
    setCoAuthor: (user : ISearchedUser) => void;
}

const ErrorMessage = styled(Alert)`
  margin-bottom: 5px;
`

const UserSearch = ({author, coAuthors, setCoAuthor}: IProps) => {
    const {bind: user, clear} = useInput('');
    const [error, setError] = useState<null | string>(null)
    const [searchUser, {isLoading}] = useFindUserMutation(user.value);

    async function findUser() {
        if (coAuthors.find((author) => author.username === user.value)) {
            setError("This user already has access to this note");
            return;
        }
        const foundedUser = await searchUser({username: user.value, author});
        if ("error" in foundedUser && "data" in foundedUser.error) {
            setError(foundedUser.error.data as string)
            return;
        }
        if ("data" in foundedUser) setCoAuthor(foundedUser.data);
        setError(null);
        clear();
    }

    return (
        <>
            {error && <ErrorMessage closable message={error} type="error"/>}
            <Input.Search loading={isLoading} onSearch={findUser} placeholder="Name"
                          enterButton="Enter" {...user} />
        </>
    )
};

export default UserSearch;