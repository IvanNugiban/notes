import React from 'react';
import styled from "styled-components";
import {Spin} from "antd";

const LoadingSpinner = styled(Spin)`
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 50%;
`

const Loader = () => {
    return (
        <LoadingSpinner size="large"/>
    );
};

export default Loader;