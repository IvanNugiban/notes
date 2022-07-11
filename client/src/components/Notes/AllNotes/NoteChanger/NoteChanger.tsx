import React, {useCallback, useMemo, useState} from 'react';
import {Modal, Typography} from "antd";
import useActions from "../../../../hooks/useActions";
import useInputHistory from '../../../../hooks/useInputHistory';
import NoteInput from "../../NoteInput/NoteInput";
import styled from "styled-components";
import {IIncomingNotes} from "../../../../types/NotesGetterTypes";
import IconTools from "../../FooterIcons/IconTools";
import Moment from 'react-moment';
import {useChangeNoteMutation} from "../../../../services/notesService";
import {useTypedSelector} from "../../../../redux/typedReduxHooks";


interface IProps {
    note: IIncomingNotes;
}

type StyledProps = {
    background: string;
}

const LastChanged = styled(Typography.Title)`
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding-right: 170px;
 &.ant-typography,
  *{
     font-size: 13px;
    color: #565656;
  }
  @media screen and (max-width: 500px) {
    bottom: 3px;
  }

  @media screen and (max-width: 360px) {
    bottom: -2px;
    &.ant-typography,
    *{
      font-size: 11px;
    }
  }
  
`

const ToolsWrapper = styled.div`
  padding: 5px 0 0 10px;
  max-width: 250px;
`

const StyledNoteChanger = styled(Modal)<StyledProps>`
  .ant-modal-content {
    background-color: ${({background}) => background}
  }

  .ant-input-textarea-show-count::after {
    position: relative;
    bottom: 7px;
    font-size: 14px;
  }

  .ant-modal-header {
    padding: 10px 25px 15px 5px;
  }

  .ant-modal-body {
    padding: 10px 25px 0 5px;
  }

  .ant-modal-footer span {
    color: #606060;
    mix-blend-mode: difference;
  }

  .ant-modal-header,
  .ant-modal-footer,
  textarea,
  textarea::placeholder {
    color: rgba(199, 198, 198, 0.60);
    mix-blend-mode: difference;
    background: transparent;
  }
`

const NoteChanger = ({note}: IProps) => {
    const customProps = useMemo(() => ({background: note.background}), [note.background]);
    const author = useTypedSelector(state => state.auth.user.username)
    const [changeNote, {isLoading}] = useChangeNoteMutation();
    const {
        closeNoteChanger,
        togglePushpinInChanger,
        setBackgroundInChanger,
        setCoAuthorInChanger,
        deleteCoAuthorInChanger
    } = useActions();
    const text = useInputHistory(note.text);
    const title = useInputHistory(note.title);
    const [lastChanged, setLastChanged] = useState<string>("text");

    const changeNoteCallback = useCallback(async () => {
    const response = await changeNote({
        id: note._id,
        text: text.bind.value,
        title: title.bind.value,
        lastChanged: {author, date: new Date().toString()},
        background: note.background,
        pined: note.pined,
        coAuthors: note.coAuthors
    })
        if ('data' in response) closeNoteChanger();
    }, [note, text.bind.value, title.bind.value]);

    return (
        <StyledNoteChanger  {...customProps} closable={false} onOk={() => changeNoteCallback()}  okText="Save" confirmLoading={isLoading}
                            title={<NoteInput maxLength={100} placeholder="Enter title" bind={title.bind}
                             callback={() => setLastChanged("title")}/>}
                            onCancel={() => closeNoteChanger()} visible={true}>
            <LastChanged level={5}>Last changed at <Moment format="DD/MM/YYYY HH:mm">{new Date(note.lastChanged.date)}</Moment> by {note.lastChanged.author}</LastChanged>
            <NoteInput maxLength={1000} placeholder="Your note..." callback={() => setLastChanged("text")}
                       bind={text.bind}/>
            <ToolsWrapper>
                <IconTools lastChanged={lastChanged} text={text} title={title} note={{
                    pined: note.pined,
                    background: note.background,
                    coAuthors: note.coAuthors
                }} actions={{
                    togglePushpin: () => togglePushpinInChanger(),
                    setBackground: (color) => setBackgroundInChanger(color),
                    setCoAuthor: (user) => setCoAuthorInChanger(user),
                    deleteCoAuthor: (userId) => deleteCoAuthorInChanger(userId)
                }}/>
            </ToolsWrapper>
        </StyledNoteChanger>
    );
};

export default NoteChanger;