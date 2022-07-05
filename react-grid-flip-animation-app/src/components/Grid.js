import {css} from '@emotion/css';
import styled from '@emotion/styled';
import {wrapGrid} from 'animate-css-grid';
import {useLayoutEffect, useRef} from 'react';
import {useMedia} from '../hooks/useMedia';

import {Card} from './Card';

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Grid = ({cardCount}) => {
  const gridDomRef = useRef(null);

  const columns = useMedia({
    queries: [
      '(min-width: 1500px)',
      '(min-width: 1000px)',
      '(min-width: 600px)',
      '(min-width: 300px)',
    ],
    values: [5, 4, 3, 2],
    defaultValue: 1,
  });

  useLayoutEffect(() => {
    wrapGrid(gridDomRef.current, {
      easing: 'backOut',
      stagger: 10,
      duration: 400,
    });
  }, []);

  return (
    <StyledGrid
      className={css`
        grid-template-rows: repeat(${Math.ceil(cardCount / columns)}, 1fr);
        grid-template-columns: repeat(${columns}, 1fr);
      `}
      ref={gridDomRef}
    >
      {[...Array(10).keys()].map((n, i) => {
        return <Card key={i} n={n} />;
      })}
    </StyledGrid>
  );
};

export {Grid};
