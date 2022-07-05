import styled from 'styled-components';

const StyledSpacer = styled.div`
  height: 10vh;
  width: 100%;
`;

const Spacer = ({height = `100vh`}) => {
  return (
    <StyledSpacer
      className={css`
        height: ${height};
      `}
    ></StyledSpacer>
  );
};

export {Spacer};
