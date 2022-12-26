import {Input, Skeleton, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useInput from "../../../hooks/useInput";
import axios, {AxiosResponse} from "axios";

const StyledNotebook = styled.div`
  min-height: 200px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #FFF4BA;
`

const PoorTextarea = styled(Input.TextArea)`
  background: transparent;
  padding: 0;

  &::placeholder {
    color: #83827B;
  }
`

const Notebook = () => {
    const {bind, setValue} = useInput("");
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getNotebookText() {
            const text: AxiosResponse<string> = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notebook/get`, {
                withCredentials: false,
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            setValue(text.data);
            setIsLoading(false);
        }

        getNotebookText();
    }, []);

    useEffect(() => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
                axios({
                    method: "put",
                    withCredentials: false,
                    url: `${process.env.REACT_APP_SERVER_URL}/api/notebook/set`,
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                    data: {
                        text: bind.value
                    }
                })
            }, 1000)
        )
    }, [bind.value]);

    return (
        <StyledNotebook>
            <Typography.Title level={4}>Notebook</Typography.Title>
            {isLoading ? <Skeleton/> :
                <PoorTextarea {...bind} maxLength={10000} placeholder="Write something down..." bordered={false}
                              autoSize/>}
        </StyledNotebook>
    );
};

export default Notebook;