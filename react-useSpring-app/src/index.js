import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useSprings, useSpring, animated} from 'react-spring';
import {BebopSpring} from './components/BebopSpring';
import {Profiles} from './components/Profiles';
import '@fontsource/kaushan-script';
import './index.scss';
import styled from '@emotion/styled';
const App = () => {
  return (
    // <BebopSpring />
    <Profiles />
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
