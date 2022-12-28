import React from 'react';
import {Alert, Button, Col, Form, Input, Layout, PageHeader, Row, Typography} from "antd";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useInput from "../../../hooks/useInput";
import {useRegisterUserMutation} from "../../../services/authService";

const RegisterTitle = styled(Typography.Title)`
  text-align: center;
  margin: 10px 0;
`

const StyledRegisterPage = styled(Layout.Content)`
  height: 100vh;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
`

const RegisterPage = () => {
    const navigate = useNavigate();
    const {bind: username, clear: clearUsernameField} = useInput('');
    const {bind: email, clear: clearEmailField} = useInput('');
    const {bind: password, clear: clearPasswordField} = useInput('');
    const [registerUser, {error, isLoading, isSuccess}] = useRegisterUserMutation();


    async function registerNewUser() {
        try {
            await registerUser({
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            }).unwrap()
            clearUsernameField();
            clearEmailField();
            clearPasswordField();
            setTimeout(() => navigate('/login', {replace: true}), 3000)
        } catch {
            return;
        }
    }

    return (
        <StyledRegisterPage>
            <PageHeader
                subTitle="Return to the main page"
                onBack={() => navigate("/welcome", {replace: true})}
            />
            <Row style={{height: "calc(100vh - 62px)"}} className="main" align="middle" justify="center">
                <Col>
                    {isSuccess && <Alert closable type="success" message="Successfully registered! Redirecting you to the login page"/>}
                    {error && "data" in error &&  <Alert closable message={error.data as string} type="error" />}
                    <RegisterTitle level={3}>Register a new account</RegisterTitle>
                    <Form
                        onFinish={registerNewUser}
                        name="registration"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        autoComplete="off"
                        labelWrap
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input {...username}/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input {...email}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password {...password}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </StyledRegisterPage>
    );
};

export default RegisterPage;