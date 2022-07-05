import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Button} from '@mui/material';
import shuffle from 'lodash/shuffle';
import useMeasure from 'react-use-measure';
import {default as chance} from 'chance';
import {useTransition, animated} from 'react-spring';

import '@fontsource/kaushan-script';
import './index.scss';

import {useMedia} from './hooks/useMedia';

const data = [...Array(chance().integer({min: 10, max: 50}))].map(
  (n, index) => {
    return {
      height: chance().integer({min: 100, max: 800}),
      imageURL: `https://picsum.photos/seed/${index}/200/300`,
    };
  }
);

const App = () => {
  const gutter = 10;
  const [items, setItems] = useState(data);

  const shuffleList = () => {
    setItems(shuffle(items));
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

  const transitions = useTransition(gridItems, {
    key: (item: {imageURL: string, height: number}) => {
      return item.imageURL;
    },
    from: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
        opacity: 0,
      };
    },
    enter: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
        opacity: 1,
      };
    },
    update: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
      };
    },
    leave: {height: 0, opacity: 0},
    config: {mass: 5, tension: 500, friction: 100},
    trail: 25,
  });

  return (
    <>
      <Button variant="outlined" onClick={shuffleList}>
        shuffle
      </Button>
      <div
        className={css`
          padding: 3rem;
          @media screen and (max-aspect-ratio: 3 /2) {
            padding: 1rem;
          }
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
          {transitions((style, item) => (
            <animated.div
              style={style}
              className={css`
                position: absolute;
                background-image: url(${item.imageURL});
                background-size: cover;
              `}
            ></animated.div>
          ))}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
