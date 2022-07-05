import styled from '@emotion/styled';
import {css} from '@emotion/css';

const StyledLeaf = styled.div`
  position: absolute;
  border: 1px solid;
`;

const Leaf = ({data}) => {
  const {x, y, width, height} = {...data};
  return (
    <StyledLeaf
      className={css`
        top: ${y}px;
        left: ${x}px;
        width: ${width}px;
        height: ${height}px;
      `}
    ></StyledLeaf>
  );
};

export {Leaf};
