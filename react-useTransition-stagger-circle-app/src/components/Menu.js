import {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {css, cx} from '@emotion/css';
import {BsReddit} from 'react-icons/bs';
import {useTransition, useSprings, useSpring, animated} from 'react-spring';
import {Button} from '@mui/material';
import shuffle from 'lodash/shuffle';
import gsap from 'gsap';
const degsToRads = (deg) => {
  return (deg * Math.PI) / 180.0;
};

const plotPoints = (radius, numberOfPoints) => {
  /* step used to place each point at equal distances */
  const angleStep = (Math.PI * 2) / numberOfPoints;

  const points = [];

  for (let i = 1; i <= numberOfPoints; i++) {
    /* x & y coordinates of the current point */
    const x = Math.cos(i * angleStep) * radius;
    const y = Math.sin(i * angleStep) * radius;

    /* push the point to the points array */
    points.push({x, y});
  }

  return points;
};

const colors = [
  `#D57E7E`,
  `#2F86A6`,
  `#233E8B`,
  `#94B49F`,
  `#46244C`,
  `#719192`,
];

const Menu = ({width, height, radius, count, delay, itemSize, index}) => {
  const pointInfoList = plotPoints(degsToRads(radius), count).map(
    (info, index) => {
      return Object.assign({...info, delay: delay * index, index});
    }
  );
  const [items, setItems] = useState(pointInfoList);
  const transition = useTransition(items, {
    from: (item) => {
      return {
        top: `${height / 2 - itemSize / 2}px`,
        left: `${width / 2 - itemSize / 2}px`,
        transform: `translate3d(${0}px,${0}px,0)`,
      };
    },
    enter: (item) => async (next) => {
      await next({
        transform: `translate3d(${item.x * width}px,${item.y * height}px,0)`,
        delay: item.delay,
      });
    },
    leave: (item) => async (next) => {
      await next({
        top: `${height / 2 - itemSize / 2}px`,
        left: `${width / 2 - itemSize / 2}px`,
        transform: `translate3d(${0}px,${0}px,0)`,
        delay: item.delay,
      });
    },
  });

  useEffect(() => {
    const id = setInterval(() => {
      setItems((e) => {
        return e.length ? [] : pointInfoList;
      });
    }, 3000);
    return () => {
      clearInterval(id)
    }
  }, []);

  return (
    <>
      {transition((style, item) => {
        return (
          <animated.div
            style={style}
            className={css`
              position: absolute;
              width: ${itemSize}px;
              height: ${itemSize}px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <BsReddit
              size={itemSize}
              color={gsap.utils.wrap(colors, item.index)}
            />
          </animated.div>
        );
      })}
    </>
  );
};

export {Menu};
