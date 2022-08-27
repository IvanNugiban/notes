import React, {useEffect, useRef, useState} from 'react';
import {Layout, Row} from "antd";
import styled from "styled-components";
import NoteInput from "../NoteInput/NoteInput";
import NoteCreatorFooter from "./NoteCreatorFooter/NoteCreatorFooter";
import useInputHistory from "../../../hooks/useInputHistory";
import {useTypedSelector} from "../../../redux/typedReduxHooks";
import useOutsideClickDetector from "../../../hooks/useOutsideClickDetector";
import useActions from "../../../hooks/useActions";

const Header = styled(Layout.Header)`
  padding: 0;
  margin-bottom: 5px;
  line-height: 0;
  height: auto;
  background: transparent;
`

const StyledNoteCreator = styled(Layout)`
  padding: 5px;
  background: transparent;
  max-width: 600px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #C0C2C2;
  margin-bottom: 10vh;
  textarea {
    &,
    &::placeholder {
      color: #A6A5A599;
    }

    mix-blend-mode: difference;
  }
`

const NoteCreator = () => {
    const [lastChanged, setLastChanged] = useState<string>("text");
    const [isActive, setActiveState] = useState<boolean>(false);
    const noteCreatorElement = useRef<HTMLElement>(null);
    const title = useInputHistory();
    const text = useInputHistory();
    const backgroundColor = useTypedSelector(state => state.notes.newNote.background);
    const {setDefaultNote} = useActions();

    useEffect(() => {
        return () => {
            setDefaultNote();
        }
    }, [])

    useOutsideClickDetector(noteCreatorElement, () => setActiveState(false))

    return (
        <Row justify="center">
            <StyledNoteCreator ref={noteCreatorElement} style={{background: backgroundColor}}>
                {isActive && <Header>
                    <NoteInput placeholder="Enter title" maxLength={100} callback={() => setLastChanged("title")}
                               bind={title.bind}/>
                </Header>}
                <Layout.Content>
                    <NoteInput bind={text.bind} callback={() => {
                        setLastChanged("text")
                        setActiveState(true);
                    }} maxLength={1000} showCount={isActive} placeholder="Your note..."/>
                </Layout.Content>
                {isActive && <NoteCreatorFooter lastChanged={lastChanged} title={title} text={text}
                                                closeWindow={() => setActiveState(false)}/>}
            </StyledNoteCreator>
        </Row>
    );
};

export default NoteCreator;