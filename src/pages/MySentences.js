import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { MySentencesHeader } from './elements';
import { NavLink } from 'react-router-dom';

const MySentences = ({ deleteSentence, getSentences, sentences }) => {
    useEffect(() => {
        getSentences()
        // eslint-disable-next-line
      }, []);

      const scores = {
        neutral: 'Neutru',
        positive: 'Pozitiv',
        negative: 'Negativ'
      };
      const scoreColors = {
        neutral: 'gray',
        positive: '#68D391',
        negative: '#E53F3E'
      };

      return (
          <Container>
              <Row>
                  <Col>
                  <MySentencesHeader>Propozițiile mele</MySentencesHeader>
                  <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Text</th>
                            <th>Scor</th>
                            <th>Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentences.map(({ _id, timestamp, sentence, result }) => (
                            <tr key={_id}>
                                <td width="20%">{new Date(timestamp).toLocaleString()}</td>
                                <td width="50%">
                                    <NavLink to={{
                                        pathname: '/',
                                        state: {sentence}
                                    }}>
                                    {sentence}
                                    </NavLink>
                                </td>
                                <td width="15%" style={{ color: scoreColors[result]}}>{scores[result]}</td>
                                <td width="15%">
                                <i className="fas fa-trash-alt" onClick={() => deleteSentence(_id)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                  </Col>
              </Row>
          </Container>
      )
}

export default MySentences;