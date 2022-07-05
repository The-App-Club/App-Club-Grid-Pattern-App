import {css} from '@emotion/css';
import styled from '@emotion/styled';
import {wrapGrid} from 'animate-css-grid';
import {useLayoutEffect, useRef} from 'react';
import {Item} from './Item';
import {Layout} from '../layouts/defaults';
const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3rem;
`;

const Grid = ({imageURLList, character}) => {
  const gridDomRef = useRef(null);
  useLayoutEffect(() => {
    wrapGrid(gridDomRef.current, {
      easing: 'backOut',
      stagger: 10,
      duration: 400,
    });
  }, []);

  return (
    <Layout>
      <StyledGrid ref={gridDomRef}>
        {imageURLList.map((imageURL, i) => {
          return (
            <Item
              key={i}
              src={imageURL}
              alt={''}
              n={i + 1}
              character={character}
            />
          );
        })}
      </StyledGrid>
    </Layout>
  );
};

export {Grid};
