import styled from '@emotion/styled';

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://media4.giphy.com/media/10VjiVoa9rWC4M/giphy.gif);
  background-size: cover;
  width: 100%;
  min-height: 10rem;
  font-size: 3rem;
  /* https://developer.mozilla.org/ja/docs/Web/CSS/@media/aspect-ratio */
  @media screen and (max-aspect-ratio: 3/2) {
    font-size: 1rem;
  }
`;

const Box = ({n}) => {
  return <StyledBox>{`BOX${n}`}</StyledBox>;
};

export {Box};
