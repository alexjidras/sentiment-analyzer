import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChartContainer from '../components/ChartContainer';
import InputContainer from '../components/InputContainer';

const MainPage = ({ analyzeInput, data, location }) => (
    <Container>
        <Row>
          <Col xs={12} lg={7}>
            <ChartContainer data={data}/>
          </Col>
          <Col xs={12} lg={5}>
            <InputContainer analyzeInput={analyzeInput} defaultSentence={location.state ? location.state.sentence : ''}/>
          </Col>
        </Row>
      </Container>
);

export default MainPage;