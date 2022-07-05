import styled from '@emotion/styled';
import {default as chance} from 'chance';
import {css} from '@emotion/css';
import {useTransition, animated} from 'react-spring';
import gsap from 'gsap';
import bebopList from '../data/dump.json';

const StyledForest = styled.div`
  position: relative;
`;

const Forest = ({data, width, height, gutter = 16}) => {
  data = data
    .filter((info) => {
      return !info.leftChild && !info.rightChild;
    })
    .map((info, index) => {
      return Object.assign({
        ...info,
        id: index,
        imageURL: gsap.utils.wrap(bebopList)(index),
      });
    });
  const transitions = useTransition(data, {
    key: (item) => {
      return item.id;
    },
    from: ({x, y, width, height}) => {
      return {
        x,
        y,
        width,
        height,
        opacity: 0,
      };
    },
    enter: ({x, y, width, height}) => {
      return {
        x,
        y,
        width,
        height,
        opacity: 1,
      };
    },
    update: ({x, y, width, height}) => {
      return {
        x,
        y,
        width,
        height,
      };
    },
    leave: {height: 0, opacity: 0},
    config: {mass: 5, tension: 500, friction: 100},
    trail: 25,
  });

  return (
    <StyledForest
      className={css`
        width: ${width}px;
        height: ${height}px;
      `}
    >
      {transitions((style, item) => {
        return (
          <animated.div
            style={style}
            className={css`
              padding: ${gutter}px;
              position: absolute;
            `}
          >
            <img
              src={item.imageURL}
              alt={''}
              className={css`
                object-fit: cover;
                width: 100%;
                height: 100%;
              `}
            />
          </animated.div>
        );
      })}
    </StyledForest>
  );
};

export {Forest};
