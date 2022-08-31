import { Button, Card, Container, Form } from 'react-bootstrap';
import { AuthInfo } from '../models';

interface Props {
    authInput: AuthInfo;
    setAuthInput: React.Dispatch<React.SetStateAction<AuthInfo>>;
    handleSubmit: (e: React.FormEvent) => void;
}

const Login: React.FC<Props> = ({ authInput, setAuthInput, handleSubmit }) => {

    return (

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={authInput.username}
                    onChange={e => setAuthInput({ username: e.target.value, password: authInput.password })}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={authInput.password}
                    onChange={e => setAuthInput({ username: authInput.username, password: e.target.value })}
                />
            </Form.Group>
            <Button onClick={handleSubmit}>Login</Button>

        </Form>
    )
}

export default Login