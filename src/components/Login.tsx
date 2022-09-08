import { Button, Card, Container, Form } from 'react-bootstrap';
import { IAuth } from '../models';

interface Props {
    authInput: IAuth;
    setAuthInput: React.Dispatch<React.SetStateAction<IAuth>>;
    handleSubmit: (e: React.FormEvent) => void;
    validated: boolean
}

const Login: React.FC<Props> = ({ authInput, setAuthInput, handleSubmit, validated}) => {

    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='loginUsername'>Username</Form.Label>
                <Form.Control
                    required
                    id='loginUsername'
                    type="text"
                    placeholder="Enter username"
                    value={authInput.username}
                    onChange={e => setAuthInput({ username: e.target.value, password: authInput.password })}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your username.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='loginPassword'>Password</Form.Label>
                <Form.Control
                    required
                    id='loginPassword'
                    type="password"
                    placeholder="Enter password"
                    value={authInput.password}
                    onChange={e => setAuthInput({ username: authInput.username, password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your password.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>Login</Button>

        </Form>
    )
}

export default Login