import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Button} from '@mui/material';
import shuffle from 'lodash/shuffle';
import {wrapGrid} from 'animate-css-grid';
import {Grid} from './components/Grid';
import {Card} from './components/Card';
import '@fontsource/kaushan-script';
import './index.scss';

const App = () => {
  return (
    <div
      className={css`
        padding: 3rem;
      `}
    >
      <Grid cardCount={15} />
    </div>
  );
};
const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
