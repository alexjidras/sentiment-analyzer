import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from './styles';
import styled from '@emotion/styled';
import './inputContainer.css';

const FormGroup = styled(Form.Group)`
    flex-grow: 1;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const InputContainer = ({ analyzeInput, defaultSentence }) => {
    const [input, setInput] = useState(defaultSentence);
    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = (save) => {
        analyzeInput(input, save);
    }

    const clear = () => {
        setInput('');
    }

    useEffect(() => {
        if (defaultSentence) {
            onSubmit(false)
        }
        // eslint-disable-next-line
      }, [])

    return (
        <Container style={{ marginBottom: '20px' }}>
            <FormGroup controlId="formGroupEmail">
                <Form.Label>Input:</Form.Label>
                <Form.Control
                    onChange={onChange}
                    value={input}
                    as="textarea"
                    rows="10"
                    placeholder="Introduceți textul..."
                />
            </FormGroup>
            <ButtonContainer>
                <Button onClick={onSubmit} variant="primary">Analizează</Button>
                <Button onClick={clear} variant="secondary">Șterge</Button>
            </ButtonContainer>
        </Container>
    )
};

export default InputContainer;