import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, FormContainer, FormTitle } from './elements';

const RegisterPage = ({ register }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        register({
            email,
            name,
            password
        })
    }
    
    return (
    <Container>
        <FormContainer>
            <FormTitle>Înregistrare</FormTitle>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={onEmailChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Nume:</Form.Label>
                <Form.Control type="text" value={name} onChange={onNameChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Parola:</Form.Label>
                <Form.Control type="password" value={password} onChange={onPasswordChange} />
            </Form.Group>
            <Form.Group>
                <Button variant="dark" style={{ width: '100%' }} onClick={onSubmit}>Înregistrează-te</Button>
            </Form.Group>
        </FormContainer>
    </Container>
)};
export default RegisterPage;