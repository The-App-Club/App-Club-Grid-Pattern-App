import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import anime from 'animejs';
import {Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {css, cx} from '@emotion/css';
import {transform} from 'framer-motion';
import * as d3 from 'd3';
import '@fontsource/kaushan-script';
import './index.scss';

const interpolateList = [
  d3.interpolateBrBG,
  d3.interpolatePRGn,
  d3.interpolatePiYG,
  d3.interpolatePuOr,
  d3.interpolateRdBu,
  d3.interpolateRdGy,
  d3.interpolateRdYlBu,
  d3.interpolateRdYlGn,
  d3.interpolateSpectral,
  d3.interpolateBlues,
  d3.interpolateGreens,
  d3.interpolateGreys,
  d3.interpolateOranges,
  d3.interpolatePurples,
  d3.interpolateReds,
  d3.interpolateTurbo,
  d3.interpolateViridis,
  d3.interpolateInferno,
  d3.interpolateMagma,
  d3.interpolatePlasma,
  d3.interpolateCividis,
  d3.interpolateWarm,
  d3.interpolateCool,
  d3.interpolateCubehelixDefault,
  d3.interpolateBuGn,
  d3.interpolateBuPu,
  d3.interpolateGnBu,
  d3.interpolateOrRd,
  d3.interpolatePuBuGn,
  d3.interpolatePuBu,
  d3.interpolatePuRd,
  d3.interpolateRdPu,
  d3.interpolateYlGnBu,
  d3.interpolateYlGn,
  d3.interpolateYlOrBr,
  d3.interpolateYlOrRd,
  d3.interpolateRainbow,
  d3.interpolateSinebow,
];

const App = () => {
  const [refresh, setRefresh] = useState(true);

  const blockSize = interpolateList.length;

  const generate = () => setRefresh(!refresh);

  const randomBlockColor = (i) => {
    return interpolateList[1](transform([0, blockSize - 1], [0, 1])(i));
  };

  return (
    <>
      <Button onClick={generate} variant={'outlined'}>
        Ganerate
      </Button>
      <div
        className={css`
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        `}
      >
        {[...Array(blockSize)].map((_, i) => {
          return (
            <Block
              key={i}
              isRefresh={refresh}
              blockColor={randomBlockColor(i)}
            />
          );
        })}
      </div>
    </>
  );
};

const Block = ({isRefresh, blockColor}) => {
  useEffect(() => {
    const rangeX = [-window.innerWidth / 2, window.innerWidth / 2];
    const rangeY = [-window.innerHeight / 2, window.innerHeight / 2];

    anime({
      targets: '.block-anime',
      translateX: () => {
        return anime.random(rangeX[0], rangeX[1]);
      },
      translateY: () => {
        return anime.random(rangeY[0], rangeY[1]);
      },
      scale: () => anime.random(1, 5),
      update: function (anim) {
        console.log('[update]', anim.progress);
      },
      begin: function (anim) {
        console.log('[begin]', anim.began);
      },
      complete: function (anim) {
        console.log('[begin]', anim.completed);
      },
    });
  }, [isRefresh]);

  return (
    <div
      className={cx(
        css`
          position: absolute;
          width: 50px;
          height: 50px;
          background-color: ${blockColor};
        `,
        'block-anime'
      )}
    ></div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
