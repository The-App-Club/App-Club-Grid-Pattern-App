import {createRoot} from 'react-dom/client';
import {cx, css} from '@emotion/css';
import {useEffect, useState, useRef, useMemo} from 'react';
import goldenRatio from 'goldenratio';
import * as d3 from 'd3';
import {useMedia} from './hooks/useMedia';
import {isMobile} from 'react-device-detect';
import data from './data/dump.json';
import {GoldenRatioBlock} from './components/GoldenRatioBlock';

import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const niceWidth = useMedia({
    queries: [
      '(min-width: 1500px)',
      '(min-width: 1300px)',
      '(min-width: 1200px)',
      '(min-width: 1100px)',
      '(min-width: 900px)',
      '(min-width: 800px)',
      '(min-width: 700px)',
      '(min-width: 600px)',
      '(min-width: 500px)',
    ],
    values: [1200, 1000, 950, 900, 800, 700, 600, 500, true],
    defaultValue: 500,
  });

  if (typeof niceWidth === `boolean`) {
    return (
      <p
        className={css`
          display: grid;
          place-items: center;
          min-height: 100vh;
          width: 100%;
          font-size: 1.5rem;
        `}
      >
        See window width size over 600px.
      </p>
    );
  }

  if (isMobile) {
    return (
      <p
        className={css`
          display: grid;
          place-items: center;
          min-height: 100vh;
          width: 100%;
          font-size: 1.5rem;
        `}
      >
        See desktop.
      </p>
    );
  }

  return (
    <div
      className={css`
        display: grid;
        place-items: center;
        min-height: 100vh;
        width: 100%;
      `}
    >
      {/* <GoldenRatioBlock niceWidth={300} /> */}
      <GoldenRatioBlock niceWidth={niceWidth} />
      {/* <GoldenRatioBlock niceWidth={300} data={data.slice(0,8)} /> */}
      {/* <GoldenRatioBlock niceWidth={600} /> */}
      {/* <GoldenRatioBlock niceWidth={700} data={data.slice(0,8)} /> */}
      {/* <GoldenRatioBlock niceWidth={300} /> */}
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
