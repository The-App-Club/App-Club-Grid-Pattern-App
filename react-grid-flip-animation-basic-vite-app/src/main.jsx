import {createRoot} from 'react-dom/client';
import {useEffect, useRef, useMemo, useState} from 'react';
import {css, cx} from '@emotion/css';
import {Search} from './components/Search';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import '@fontsource/inter';
import './styles/index.scss';
import {HomePage} from './pages/home';
import {TagPage} from './pages/tag';

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/tag'} element={<TagPage />} />
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
