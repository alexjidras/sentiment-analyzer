import styled from '@emotion/styled';

export const StyledBr = styled.br`
    content: ' ';
    display: block;
`;

export const ScoreLabelSpan = styled.span`
    font-size: 25px;
    @media (max-width: 440px) {
        font-size: 20px;
    }
`;

export const ScoreValueSpan = styled.span`
    display: block;
    lineHeight: 50px;
    font-size: 40px;
    @media (max-width: 440px) {
        font-size: 32px;
        line-height: 40px;
    }
`;

export const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid rgb(236, 236, 236);
    border-radius: 4px;
    height: 600px;
    background: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;

    @media (max-width: 450px) {
        height: 500px;
    }
`;

export const AbsoluteContainer = styled.div`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;

`;
export const Icon = styled.i`
    font-size: 200px;
    color: #aeaeae;
    margin-bottom: 25px;
`;

export const NoDataParagraph = styled.p`
    font-size: 22px;
    color: #aeaeae;
`;
