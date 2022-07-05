import styled from '@emotion/styled';
import {Leaf} from './Leaf';
import {default as chance} from 'chance';
import {css} from '@emotion/css';
import {useTransition, animated} from 'react-spring';

const StyledForest = styled.div`
  position: relative;
`;

const Forest = ({data, width, height, gutter = 10}) => {
  data = data
    .filter((info) => {
      return !info.leftChild && !info.rightChild;
    })
    .map((info, index) => {
      return Object.assign({
        ...info,
        imageURL: `https://picsum.photos/seed/${index + 1}/200/300`,
      });
    });
  // console.log(data);
  const transitions = useTransition(data, {
    key: (item) => {
      return item.imageURL;
    },
    from: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
        opacity: 0,
      };
    },
    enter: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
        opacity: 1,
      };
    },
    update: ({x, y, width, height}) => {
      return {
        x: x + gutter,
        y: y + gutter,
        width: width - gutter,
        height: height - gutter,
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
      {transitions((style, item) => (
        <animated.div
          style={style}
          className={css`
            position: absolute;
            background-image: url(${item.imageURL});
            background-size: cover;
          `}
        ></animated.div>
      ))}
      {/* {data.map((leafInfo, i) => {
        const {leftChild, rightChild} = {...leafInfo};
        if (leftChild && rightChild) {
          // return [leafInfo, leftChild, rightChild].map((leafInfo2, j) => {
          //   return <Leaf key={chance().guid()} data={leafInfo2} />;
          // });
        } else {
          return <Leaf key={chance().guid()} data={leafInfo} />;
        }
      })} */}
    </StyledForest>
  );
};

export {Forest};
