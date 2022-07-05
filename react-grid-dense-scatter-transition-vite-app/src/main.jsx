import {
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css, cx} from '@emotion/css';
import {transform} from 'framer-motion';
import {default as chance} from 'chance';
import {Button} from '@mui/material';
import styled from '@emotion/styled';
import gsap from 'gsap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledGrid = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, auto);
  min-height: 100vh;
  width: 100%;
  grid-gap: 1rem;
  .div1 {
    grid-area: 9 / 3 / 12 / 5;
  }
  .div2 {
    grid-area: 2 / 10 / 5 / 12;
  }
  .div3 {
    grid-area: 2 / 7 / 4 / 9;
  }
  .div4 {
    grid-area: 8 / 10 / 10 / 12;
  }
  .div5 {
    grid-area: 11 / 6 / 13 / 9;
  }
  .div6 {
    grid-area: 2 / 2 / 4 / 5;
  }
  .div7 {
    grid-area: 5 / 2 / 7 / 4;
  }
  .div8 {
    grid-area: 4 / 5 / 8 / 6;
  }
  .div9 {
    grid-area: 5 / 7 / 7 / 10;
  }
  .div10 {
    grid-area: 8 / 7 / 10 / 8;
  }
`;

const dataCount = 10;

// Distance from the element's center point to the center of the page
const getDistance = (element) => {
  const elCenter = {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
  };
  return Math.hypot(
    elCenter.x - window.innerWidth / 2,
    elCenter.y - window.innerHeight / 2
  );
};
// Calculates the position of an element when the element is [distanceDifference]px more far from the center of the page than it was previously
const getInitialPosition = (element, distanceDifference = 400) => {
  const elCenter = {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
  };
  const angle = Math.atan2(
    Math.abs(window.innerHeight / 2 - elCenter.y),
    Math.abs(window.innerWidth / 2 - elCenter.x)
  );

  let x = Math.abs(Math.cos(angle) * distanceDifference);
  let y = Math.abs(Math.sin(angle) * distanceDifference);

  return {
    x: elCenter.x < window.innerWidth / 2 ? x * -1 : x,
    y: elCenter.y < window.innerHeight / 2 ? y * -1 : y,
  };
};

const App = () => {
  const duration = 1;
  const animating = useRef(false);
  const infoList = useRef([]);
  const imageDomRefs = useMemo(() => {
    return [...Array(dataCount).keys()].map((n, index) => {
      return createRef();
    });
  }, []);
  const notify = () => {
    toast('animating...', {
      position: 'top-right',
      autoClose: duration * 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const tl = useMemo(() => {
    return gsap
      .timeline({
        paused: true,
        onStart: (e) => {
          // notify();
        },
        onComplete: (e) => {
          animating.current = false;
          console.log(`tl, done`);
        },
      })
      .addLabel('start', 0);
  });
  const tl2 = useMemo(() => {
    return gsap
      .timeline({
        paused: true,
        onStart: (e) => {
          // notify();
        },
        onComplete: () => {
          animating.current = false;
          console.log(`tl2, done`);
        },
      })
      .addLabel('start', 0);
  });

  useLayoutEffect(() => {
    const imageDomList = imageDomRefs.map((imageDomRef) => {
      return imageDomRef.current;
    });
    imageDomList.forEach((imageDom) => {
      const {x, y} = getInitialPosition(imageDom);
      const delay = transform([0, 1000], [0, 0.4])(getDistance(imageDom));
      infoList.current.push({x, y, dom: imageDom, delay});
    });
  }, []);

  const show = () => {
    if (animating.current) {
      return;
    }
    tl.seek(0);
    animating.current = true;

    const list = infoList.current;
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      const {x, y, dom, delay} = item;
      tl.set(
        dom,
        {
          x: x * 3,
          y: y * 3,
          opacity: 0,
        },
        'start'
      ).to(
        dom,
        {
          ease: 'expo',
          x: 0,
          y: 0,
          delay: delay,
          opacity: 1,
        },
        'start+=0.4'
      );
    }
    tl.duration(duration).play();
  };

  const hide = () => {
    if (animating.current) {
      return;
    }
    tl2.seek(0);
    animating.current = true;
    const list = infoList.current;
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      const {x, y, dom, delay} = item;
      tl2.to(
        dom,
        {
          ease: 'expo',
          x: x * 3,
          y: y * 3,
          delay: delay,
          opacity: 1,
        },
        'start'
      );
    }
    tl2.duration(duration).play();
  };

  return (
    <>
      <Button variant={'outlined'} onClick={show}>
        {'dense'}
      </Button>
      <Button variant={'outlined'} onClick={hide}>
        {'scatter'}
      </Button>

      <StyledGrid>
        {[...Array(dataCount).keys()].map((n, i) => {
          return (
            <div
              key={i}
              className={cx(
                css`
                  width: 100%;
                  max-width: 100px;
                `,
                `div${n + 1}`
              )}
            >
              <img
                ref={imageDomRefs[i]}
                src={`https://picsum.photos/seed/${n + 1}/200/300`}
                alt={''}
                className={css`
                  width: 100%;
                  max-width: 100%;
                  display: block;
                `}
              />
            </div>
          );
        })}
      </StyledGrid>
      <ToastContainer />
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
