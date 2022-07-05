import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '@mui/material';
import {css} from '@emotion/css';
import {default as chance} from 'chance';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Grid} from './components/Grid';
import {CowboyBebop} from './pages/cowboy-bebop';
import {Spike} from './pages/spike';
import {Faye} from './pages/faye';
import {Jet} from './pages/jet';
import {Edward} from './pages/edward';
import {CharacterDetail} from './pages/character-detail';

import '@fontsource/kaushan-script';
import './styles/index.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CowboyBebop />} />
      <Route path="spike" element={<Spike />}>
        <Route
          index
          element={
            <Grid
              imageURLList={[
                'https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif',
                'https://media.giphy.com/media/xdgisqRDFyO9G/giphy.gif',
                'https://media.giphy.com/media/b21HcSrrBu8pi/giphy.gif',
                'https://media.giphy.com/media/11KzOet1ElBDz2/giphy.gif',
              ]}
              character={'spike'}
            />
          }
        />
        <Route path=":detail" element={<CharacterDetail />} />
      </Route>
      <Route path="faye" element={<Faye />}>
        <Route
          index
          element={
            <Grid
              imageURLList={[
                'https://media.giphy.com/media/10VjiVoa9rWC4M/giphy.gif',
                'https://media.giphy.com/media/3TACspcXhhQPK/giphy.gif',
                'https://media.giphy.com/media/c4Niddu90G5KU/giphy.gif',
                'https://media.giphy.com/media/ovrcwymJaF9f2/giphy.gif',
              ]}
              character={'faye'}
            />
          }
        />
        <Route path=":detail" element={<CharacterDetail />} />
      </Route>
      <Route path="jet" element={<Jet />}>
        <Route
          index
          element={
            <Grid
              imageURLList={[
                'https://media.giphy.com/media/vRKJTZ1w731kc/giphy.gif',
                'https://media.giphy.com/media/zy89dUFZCagFy/giphy.gif',
                'https://media.giphy.com/media/13TdMFTIORb9aU/giphy.gif',
                'https://media.giphy.com/media/BrFTdYQmMXduw/giphy.gif',
              ]}
              character={'jet'}
            />
          }
        />
        <Route path=":detail" element={<CharacterDetail />} />
      </Route>
      <Route path="edward" element={<Edward />}>
        <Route
          index
          element={
            <Grid
              imageURLList={[
                'https://media.giphy.com/media/USNlL9p2fxY6Q/giphy.gif',
                'https://media.giphy.com/media/dKVw0JwmqjtMA/giphy.gif',
                'https://media.giphy.com/media/Gi8ilHwjq6kcU/giphy.gif',
                'https://media.giphy.com/media/MeFiwDSGDApHy/giphy.gif',
              ]}
              character={'edward'}
            />
          }
        />
        <Route path=":detail" element={<CharacterDetail />} />
      </Route>
    </Routes>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
