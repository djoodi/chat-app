import Axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthInfo } from "../models";

interface Props {
    authInput: AuthInfo;
    setAuthInput: React.Dispatch<React.SetStateAction<AuthInfo>>;
    handleSubmit: (e: React.FormEvent) => void;
    validated: boolean;
}

const Register : React.FC<Props> = ({authInput, setAuthInput, handleSubmit, validated}) => {

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='registerUsername'>Username</Form.Label>
                <Form.Control
                    id='useregisterUsernamername'
                    required
                    type="text"
                    placeholder="Enter username"
                    value={authInput.username}
                    onChange={e => setAuthInput({ username: e.target.value, password: authInput.password })}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a username.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='registerPassword'>Password</Form.Label>
                <Form.Control
                    id='registerPassword'
                    required
                    type="password"
                    placeholder="Enter password"
                    value={authInput.password}
                    onChange={e => setAuthInput({ username: authInput.username, password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a password.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>Register</Button>

        </Form>
    );
};

export default Register;
