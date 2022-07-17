import {List, Row, Typography} from 'antd';
import React, {useMemo} from 'react';
import CloseButton from "../../../../../ui/CloseButton/CloseButton";
import {ISearchedUser} from "../../../../../types/ISearchedUser";

interface IProps {
    author: string;
    coAuthors: ISearchedUser[];
    deleteCoAuthor: (userId : string) => void;
    creator?: string;
}

const ListOfAuthors = ({author, coAuthors, deleteCoAuthor, creator} : IProps) => {
    const authors = useMemo(() => [
    <Typography>{creator ? creator : author } (author)</Typography>,
    ...coAuthors.map(coAuthor => (
            <Row style={{width: "100%"}} key={coAuthor.id} align="middle" justify="space-between">
                <Typography>{coAuthor.username}</Typography>
                {(!creator || coAuthor.username === author) && <CloseButton id={coAuthor.id} callback={() => deleteCoAuthor(coAuthor.id)} />}
            </Row>
    ))
    ], [coAuthors])

    return (
      <List dataSource={authors} renderItem={(item) => <List.Item>{item}</List.Item>}/>
    );
};

export default ListOfAuthors;