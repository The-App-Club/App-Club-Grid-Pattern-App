import {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useTransition, useSprings, useSpring, animated} from 'react-spring';
import '@fontsource/kaushan-script';
import './index.scss';
import {Button} from '@mui/material';
import styled from '@emotion/styled';

const App = () => {
  const [items, setItems] = useState([]);
  const transition = useTransition(items, {
    from: (item) => {
      return {
        transform: `translate3d(0,${-80}px,0)`,
        opacity: 0,
        delay: item.delay,
      };
    },
    enter: (item) => async (next) => {
      await next({
        transform: `translate3d(0,${item.y}px,0)`,
        opacity: 1,
        delay: item.delay,
      });
      await next({
        transform: `translate3d(${item.x}px,${item.y}px,0)`,
        opacity: 1,
        delay: item.delay,
      });
    },
    leave: (item) => async (next) => {
      await next({
        transform: `translate3d(0,${80}px,0)`,
        opacity: 0,
        delay: item.delay,
      });
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setItems((e) => {
        return e.length
          ? []
          : [
              {x: 0, y: 0, delay: 100, fig: 1},
              {x: 0, y: 0, delay: 200, fig: 2},
              {x: 0, y: 0, delay: 300, fig: 3},
              {x: 0, y: 0, delay: 400, fig: 4},
            ];
      });
    }, 2000);
  }, [items]);

  return (
    <>
      {/* <Button
        className={css`
          position: fixed;
          top: 3rem;
          left: 3rem;
        `}
        variant="contained"
        onClick={() => {
          setItems((e) => {
            return e.length
              ? []
              : [
                  {x: 0, y: 0, delay: 100, fig: 1},
                  {x: 0, y: 0, delay: 200, fig: 2},
                  {x: 0, y: 0, delay: 300, fig: 3},
                  {x: 0, y: 0, delay: 400, fig: 4},
                ];
          });
        }}
      >
        animation
      </Button> */}
      <div
        className={css`
          display: grid;
          place-items: center;
          min-height: 100vh;
          background: rgb(33, 90, 158);
          background: linear-gradient(
            135deg,
            rgba(33, 90, 158, 1) 40%,
            rgba(21, 67, 175, 1) 92%
          );
        `}
      >
        <div
          className={css`
            display: flex;
          `}
        >
          {transition(
            (style, item) =>
              item && (
                <animated.span
                  style={style}
                  className={css`
                    min-width: 5rem;
                    font-size: 5rem;
                    display: inline-block;
                    background: linear-gradient(
                      9deg,
                      #ffde65,
                      #ff8484 50%,
                      #ff86c3 60%,
                      #716fff 80%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  `}
                >
                  {item.fig}
                </animated.span>
              )
          )}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
