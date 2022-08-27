import React from 'react';
import {PushpinOutlined} from "@ant-design/icons";
import styled from 'styled-components';

type StyledProps = {
    isActive: boolean;
}

interface IProps {
    callback: () => void;
    isActive: boolean;
}

const StyledPushpinButton = styled.span<StyledProps>`
  * {
    color: ${({isActive}) => isActive ? "white" : "#5b5a5a"}
  }
`

const PushpinButton = ({callback, isActive} : IProps) => {

    return (
        <StyledPushpinButton  isActive={isActive}>
        <PushpinOutlined onClick={callback}  className="notes_creator-item" />
        </StyledPushpinButton>
    );
};

export default PushpinButton;