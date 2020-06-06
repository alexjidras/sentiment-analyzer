// import React from 'react';
import styled from '@emotion/styled';

export const Container = styled.div`
    margin: 0 auto;
    width: 360px;
`;

export const FormContainer = styled.div`
    //bottom: 50%;
    //transform: translateY(50%);
    margin-top: 100px;
    margin-left: 15px;
    margin-right: 15px;
    background-color: #efefef;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06);
    padding: 35px;
`;

export const FormTitle = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;

export const MySentencesHeader = styled.h3`
    margin-bottom: 25px;
    margin-top: 30px;
    @media (max-width: 430px) {
        margin-top: 30px;
        font-size: 24px;
        margin-bottom: 20px;
    }
`;