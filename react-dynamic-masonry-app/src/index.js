import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Button} from '@mui/material';
import shuffle from 'lodash/shuffle';
import useMeasure from 'react-use-measure';
import {default as chance} from 'chance';

import '@fontsource/kaushan-script';
import './index.scss';

import {useMedia} from './hooks/useMedia';

const App = () => {
  const gutter = 10;
  const [itemCount, setItemCount] = useState(
    chance().integer({min: 10, max: 50})
  );
  const [items, setItems] = useState(
    [...Array(itemCount)].map((n, index) => {
      return {
        height: chance().integer({min: 100, max: 800}),
      };
    })
  );

  const shuffleList = () => {
    const c = chance().integer({min: 10, max: 50});
    setItemCount(c);
    setItems(
      [...Array(c)].map((n, index) => {
        return {
          height: chance().integer({min: 100, max: 800}),
        };
      })
    );
  };

  const [ref, {width: containerWidth}] = useMeasure();
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

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    const gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights));
      heights[column] += child.height;
      const x = (containerWidth / columns) * column;
      const y = heights[column] - child.height;
      return {
        ...child,
        x,
        y,
        width: containerWidth / columns,
        height: child.height,
      };
    });
    return [heights, gridItems];
  }, [columns, items, containerWidth]);

  return (
    <>
      <Button variant="outlined" onClick={shuffleList}>
        shuffle
      </Button>
      <div
        className={css`
          padding: 3rem;
        `}
      >
        <div
          ref={ref}
          className={css`
            width: 100%;
            height: max(100vh, ${Math.max(...heights)}px);
            position: relative;
          `}
        >
          {gridItems.map((item, index) => {
            return (
              <div
                key={index}
                className={css`
                  position: absolute;
                  top: ${item.y + gutter}px;
                  left: ${item.x + gutter}px;
                  width: ${item.width - gutter}px;
                  height: ${item.height - gutter}px;
                  background-image: url(https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif);
                  background-size: cover;
                `}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
