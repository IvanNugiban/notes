import React, {useCallback} from 'react';
import {Alert, Button, Layout, Row} from "antd";
import styled from "styled-components";
import {InputHistoryType} from "../../../../types/InputHistoryHookTypes";
import IconTools from "../../FooterIcons/IconTools";
import {useTypedSelector} from "../../../../redux/typedReduxHooks";
import {useAddNoteMutation} from "../../../../services/notesService";
import useActions from "../../../../hooks/useActions";


const Footer = styled(Layout.Footer)`
  padding: 10px 10px 0 10px;
  line-height: 0;
  height: auto;
  background: transparent;
`

const ColoredButton = styled(Button)`
  &,
  span {
    color: #606060;
    mix-blend-mode: difference;
  }
`

interface IProps {
    lastChanged: string;
    text: InputHistoryType;
    title: InputHistoryType;
    closeWindow: () => void;
}


const NoteCreatorFooter = ({lastChanged, text, title, closeWindow}: IProps) => {
    const newNote = useTypedSelector(state => state.notes.newNote);
    const author = useTypedSelector(state => state.auth.user.username);
    const [createNewNote, {isLoading, error}] = useAddNoteMutation();
    const {setDefaultNote} = useActions();
    const {pined, background,coAuthors} = useTypedSelector(state => state.notes.newNote);
    const {togglePushpinButtonInCreator, setBackgroundInCreator, setCoAuthorInCreator, deleteCoAuthorInCreator} = useActions();

    const createNote = useCallback(async () => {
      await createNewNote({text: text.bind.value, title: title.bind.value, lastChanged: {author, date: new Date().toString()} , ...newNote});
        text.clear();
        title.clear();
        setDefaultNote();
        closeWindow();
    }, [newNote, text.bind.value, title.bind.value])

    return (
        <Footer>
            <Row justify="space-between">
                <IconTools lastChanged={lastChanged} text={text} title={title} note={{
                    pined,
                    background,
                    coAuthors
                }} actions={{
                    togglePushpin: () => togglePushpinButtonInCreator(),
                    setBackground: (color) => setBackgroundInCreator(color),
                    setCoAuthor: setCoAuthorInCreator,
                    deleteCoAuthor: (userId) => deleteCoAuthorInCreator(userId)
                }}/>
                {title.bind.value.length || text.bind.value.length ?
                    <ColoredButton onClick={createNote} loading={isLoading} type="primary">Create</ColoredButton> :
                    <ColoredButton danger className="notes_creator-danger-btn" onClick={closeWindow} type="primary"
                    >Close</ColoredButton>}
            </Row>
            {error && "data" in error &&
                <Alert style={{paddingTop: 5}} closable message={error.data as string} type="error"/>}
        </Footer>

    );
};

export default NoteCreatorFooter;