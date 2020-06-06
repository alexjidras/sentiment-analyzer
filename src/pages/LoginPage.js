import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, FormContainer, FormTitle } from './elements';

const LoginPage = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        login({
            email,
            password
        })
    }
    
    return (
    <Container>
        <FormContainer>
            <FormTitle>Autentificare</FormTitle>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={onEmailChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Parola:</Form.Label>
                <Form.Control type="password" value={password} onChange={onPasswordChange} />
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Stai logat" />
            </Form.Group>
            <Form.Group>
                <Button variant="dark" style={{ width: '100%' }} onClick={onSubmit}>Intră</Button>
            </Form.Group>
        </FormContainer>
    </Container>
)};

export default LoginPage;