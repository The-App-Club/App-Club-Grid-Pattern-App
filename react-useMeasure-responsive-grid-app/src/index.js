import {createRoot} from 'react-dom/client';
import {useState, useEffect, useMemo} from 'react';
import {use, a} from 'react-spring';
import shuffle from 'lodash/shuffle';
import useMeasure from './hooks/useMeasure';
import useMedia from './hooks/useMedia';
import data from './data/dump';
import './index.scss';

function App() {
  
  return (
    
  );
}

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
