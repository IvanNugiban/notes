import React, {ComponentType, useEffect, useState} from 'react';
import {RedoOutlined, UndoOutlined} from "@ant-design/icons";
import {InputHistoryType} from "../../../../types/InputHistoryHookTypes";
import styled from "styled-components";

type RedoButtonProps = {
    clickable: boolean;
};


interface IProps {
    lastChanged: string;
    text: InputHistoryType;
    title: InputHistoryType;
}


const StyledRedoButton = styled.span<RedoButtonProps>`

  * {
    cursor: ${({clickable}) => clickable ? "pointer" : "not-allowed"};
    font-size: 1.1em;
    mix-blend-mode: difference;
    color: ${({clickable}) => clickable ? "white" : "#5b5a5a"};
  }
}
`

const RedoButton = ({lastChanged, text, title}: IProps) => {
    const [isClickable, setClickable] = useState<boolean>(false);

    useEffect(() => {
        if (lastChanged !== "text") return;
        if (text.inputHistory.length !== text.count + 1) setClickable(true)
        else setClickable(false)
    }, [lastChanged, text.count, text.inputHistory])

    useEffect(() => {
        if (lastChanged !== "title") return;
        if (title.inputHistory.length !== title.count + 1) setClickable(true)
        else setClickable(false)
    }, [lastChanged, title.count, title.inputHistory])


    return (
        <StyledRedoButton clickable={isClickable}>
            <RedoOutlined onClick={() => {
                if (!isClickable) return;
                if (lastChanged === "text") text.redo();
                else title.redo()
            }} id="Redo"/>
        </StyledRedoButton>
    );
};

export default RedoButton;