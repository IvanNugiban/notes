import React, {ComponentType, useEffect, useState} from 'react';
import {UndoOutlined} from "@ant-design/icons";
import {InputHistoryType} from "../../../../types/InputHistoryHookTypes";
import styled from "styled-components";

type UndoButtonProps = {
    clickable: boolean;
};


interface IProps {
    lastChanged: string;
    text: InputHistoryType;
    title: InputHistoryType;
}


const StyledUndoButton = styled.span<UndoButtonProps>`

  * {
    cursor: ${({clickable}) => clickable ? "pointer" : "not-allowed"};
    font-size: 1.1em;
    mix-blend-mode: difference;
    color: ${({clickable}) => clickable ? "white" : "#5b5a5a"};
  }
}
`

const UndoButton = ({lastChanged, text, title}: IProps) => {
    const [isClickable, setClickable] = useState<boolean>(false);

    useEffect(() => {
        if (lastChanged !== "text") return;
        if (text.inputHistory.length >= 1 && text.count !== 0) setClickable(true)
        else setClickable(false)
    }, [lastChanged, text.count, text.inputHistory])

    useEffect(() => {
        if (lastChanged !== "title") return;
        if (title.inputHistory.length >= 1 && title.count !== 0) setClickable(true)
        else setClickable(false)
    }, [lastChanged, title.count, title.inputHistory])


    return (
        <StyledUndoButton clickable={isClickable}>
            <UndoOutlined onClick={() => {
                if (!isClickable) return;
                if (lastChanged === "text") text.undo();
                else title.undo()
            }} id="Undo"/>
        </StyledUndoButton>
    );
};

export default UndoButton;