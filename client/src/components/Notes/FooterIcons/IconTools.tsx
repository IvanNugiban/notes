import React, {useMemo, useState} from 'react';
import {List, Popover} from "antd";
import {BgColorsOutlined, DeleteOutlined, UserAddOutlined} from "@ant-design/icons";
import NoteShare from "./NoteShare/NoteShare";
import ColorPicker from "./ColorPicker/ColorPicker";
import UndoButton from "./UndoButton/UndoButton";
import RedoButton from "./RedoButton/RedoButton";
import styled from "styled-components";
import {InputHistoryType} from "../../../types/InputHistoryHookTypes";
import PushpinButton from "../../../ui/PushpinButton/PushpinButton";
import {ISearchedUser} from "../../../types/ISearchedUser";

const Wrapper = styled.span<{position?: string}>`
    position: ${({position}) => position || "static" };
`


interface IProps {
    lastChanged: string;
    text: InputHistoryType;
    title: InputHistoryType;
    note: {
        pined: boolean;
        background: string;
        coAuthors: ISearchedUser[];
    };
    actions: {
        togglePushpin: () => void;
        setBackground: (color: string) => void;
        setCoAuthor: (user : ISearchedUser) => void;
        deleteCoAuthor: (userId: string) => void;
    }
}

const IconTools = ({lastChanged, text, title, note, actions} : IProps) => {
    const [whichOpened, setOpened] = useState<"background" | "co-authors" | undefined>(undefined);

    const data = useMemo(() => [
        <Wrapper id="Pin note">
        <PushpinButton callback={() => actions.togglePushpin()} isActive={note.pined}/>
        </Wrapper>,
        <Wrapper id="Co-authors">
            <UserAddOutlined onClick={() => setOpened("co-authors")} className="notes_creator-item"  />
            {whichOpened === "co-authors" && <NoteShare deleteCoAuthor={actions.deleteCoAuthor} coAuthors={note.coAuthors} setCoAuthor={actions.setCoAuthor} closeWindow={() => setOpened(undefined)}/>}
        </Wrapper>,
        <Wrapper position="relative" id="Parameters of background">
            <BgColorsOutlined className="notes_creator-item" onClick={() => setOpened("background")} />
            {whichOpened === "background" && <ColorPicker setBackground={actions.setBackground} color={note.background} closeWindow={() => setOpened(undefined)}/>}
        </Wrapper>
        ,
        <DeleteOutlined className="notes_creator-item" onClick={() => {
            text.clear();
            title.clear();
        }} id="Clear note" />,
        <UndoButton  text={text} title={title} lastChanged={lastChanged}/>,
        <RedoButton text={text} title={title} lastChanged={lastChanged}/>,

    ], [lastChanged, text, title, whichOpened, note]);

    return (
        <List style={{paddingTop: "7px"}} grid={{gutter: 20, column: 6}} split={false} dataSource={data}
              renderItem={item => (
                  <List.Item>
                      <Popover content={item.props.id}>
                          {item}
                      </Popover>
                  </List.Item>
              )}/>
    );
};

export default IconTools;