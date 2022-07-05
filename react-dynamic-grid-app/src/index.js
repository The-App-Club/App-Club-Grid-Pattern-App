import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Box} from './components/Box';
import {Button} from '@mui/material';
import {Grid} from './components/Grid';
import shuffle from 'lodash/shuffle';
import '@fontsource/kaushan-script';
import './index.scss';

const App = ({info}) => {
  const [data, setData] = useState(
    [...Array(info.rowSize * info.colSize)].map((n, index) => {
      return index + 1;
    })
  );
  const shuffleList = () => {
    setData(shuffle(data));
  };
  return (
    <>
      <Button variant="outlined" onClick={shuffleList}>
        shuffle
      </Button>
      <Grid data={data} rowSize={info.rowSize} colSize={info.colSize} />
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App info={{rowSize: 4, colSize: 4}} />);
