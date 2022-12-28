import React, {useRef} from 'react';
import {Alert, Button, Checkbox, Col, Form, Input, Layout, PageHeader, Row, Typography} from "antd";
import styled from "styled-components"
import useInput from "../../../hooks/useInput";
import {useLoginUserMutation} from "../../../services/authService";
import {useNavigate} from "react-router-dom";
import login from "../../../utils/asyncActionCreators/login";
import {useTypedDispatch} from "../../../redux/typedReduxHooks";

const LoginTitle = styled(Typography.Title)`
  text-align: center;
  margin: 10px 0;
`

const StyledLoginPage = styled(Layout.Content)`
  height: 100vh;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
`


const LoginPage = () => {
    const {bind: emailOrUsername} = useInput('');
    const {bind: password} = useInput('');
    const [setLoginData, {isLoading, error, isSuccess}] = useLoginUserMutation();
    const rememberMe = useRef<any>();
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();

    async function authUser() {
        const response = await setLoginData({
            emailOrUsername: emailOrUsername.value.trim(),
            password: password.value.trim()
        });
        if (!("data" in response)) return;
        sessionStorage.setItem("loggedIn", JSON.stringify(response.data.user));
        if (rememberMe.current.props.checked) localStorage.setItem("token", response.data.token)
        setTimeout(() => dispatch(login(response.data.user, navigate)), 2000);
    }


    return (
        <StyledLoginPage>
            <PageHeader
                subTitle="Return to the main page"
                onBack={() => navigate("/welcome", {replace: true})}
            />
            <Row style={{height: "calc(100vh - 62px)"}} align="middle" justify="center">
                <Col >
                    {isSuccess && <Alert closable type="success" message="Successfully logged in!"/>}
                    {error && "data" in error && <Alert closable message={error.data as string} type="error"/>}
                    <LoginTitle level={2}>Login</LoginTitle>
                    <Form
                        onFinish={authUser}
                        name="login"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        autoComplete="off"
                        labelWrap
                    >
                        <Form.Item
                            label="Email/Username"
                            name="emailOrUsername"
                            rules={[{required: true, message: 'Please input your email or username!'}]}
                        >
                            <Input {...emailOrUsername}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password {...password}/>
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                            <Checkbox ref={rememberMe}>Remember me for 30 days</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </StyledLoginPage>
    );
};

export default LoginPage;