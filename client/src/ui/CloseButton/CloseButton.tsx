import React from 'react';
import {CloseCircleTwoTone} from "@ant-design/icons";
import styled from "styled-components";

interface IProps {
    callback: () => void,
    id: string
}

const StyledCloseButton = styled(CloseCircleTwoTone)`
    cursor: pointer;
`

const CloseButton = ({callback, id} : IProps) => {
    return (
        <StyledCloseButton onClick={callback} id={id} twoToneColor="#FF4D4F" />
    );
};

export default CloseButton;