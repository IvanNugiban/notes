import React, {useRef} from 'react';
import {TwitterPicker} from "react-color";
import styled from "styled-components";
import useOutsideClickDetector from "../../../../hooks/useOutsideClickDetector";

interface IProps {
    closeWindow: () => void;
    setBackground: (color: string) => void;
    color: string;
}

const Wrapper = styled.div`
  position: absolute;
  max-width: 300px;
  top: 30px;
  left: -90px;
  z-index: 999;
  box-shadow: 0 0 5px 3px #C0C2C2;
`


const ColorPicker = ({closeWindow, setBackground, color}: IProps) => {
    const ColorPickerElement = useRef<HTMLDivElement>(null);
    useOutsideClickDetector(ColorPickerElement, closeWindow);

    return (
        <Wrapper ref={ColorPickerElement}>
            <TwitterPicker triangle="hide" onChangeComplete={(color) => setBackground(color.hex)}
                           color={color}/>
        </Wrapper>
    )
};

export default ColorPicker;