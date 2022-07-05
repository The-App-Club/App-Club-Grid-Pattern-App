import {useState, useEffect, useMemo, createRef} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Box} from './Box';
import {Flipper, Flipped} from 'react-flip-toolkit';
import {Button} from '@mui/material';

import {useMedia} from '../hooks/useMedia';

const Grid = ({data, rowSize = 5, colSize = 5}) => {
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
  return (
    <Flipper
      flipKey={data.join('')}
      className={css`
        width: 100%;
        height: 100%;
        padding: 0.5rem;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-rows: repeat(
            ${Math.ceil((rowSize * colSize) / columns)},
            1fr
          );
          grid-template-columns: repeat(${Math.min(colSize, columns)}, 1fr);
          grid-row-gap: 1rem;
          grid-column-gap: 1rem;
          width: 100%;
          height: 100%;
        `}
      >
        {data.map((d, index) => {
          return (
            <Flipped key={d} flipId={d}>
              <div
                className={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Box n={d} />
              </div>
            </Flipped>
          );
        })}
      </div>
    </Flipper>
  );
};

export {Grid};
