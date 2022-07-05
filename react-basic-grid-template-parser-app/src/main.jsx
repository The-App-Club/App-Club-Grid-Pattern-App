import {createRoot} from 'react-dom/client';
import {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {css} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
import {grid} from 'grid-template-parser';

const areas = grid(`
  "a a a b b"
  "a a a b b"
  ". . c c c"
  "d d d d d"
`);

console.log(areas);

const App = () => {
  return (
    <div className="container">
      <div className="item a">A</div>
      <div className="item b">B</div>
      <div className="item c">C</div>
      <div className="item d">D</div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
