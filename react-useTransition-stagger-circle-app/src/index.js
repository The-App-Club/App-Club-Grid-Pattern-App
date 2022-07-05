import {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useTransition, useSprings, useSpring, animated} from 'react-spring';
import '@fontsource/kaushan-script';
import './index.scss';
import {Button} from '@mui/material';
import styled from '@emotion/styled';
import {default as chance} from 'chance';
import { Box } from './components/Box';

const App = () => {
  return (
    <div className={css`
      display: grid;
      place-items: center;
      min-height: 100vh;
    `}>
      <Box width={280} height={280} />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
