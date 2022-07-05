import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Menu} from './Menu';

const Box = ({width, height}) => {
  return (
    <div
      className={css`
        position: relative;
        width: ${width}px;
        height: ${height}px;
      `}
    >
      {[...Array(3)].map((n, index) => {
        return (
          <Menu
            key={index}
            index={index}
            width={width}
            height={height}
            itemSize={50}
            radius={18 * (index + 1)}
            count={8 * (index + 1)}
            delay={100}
          />
        );
      })}
    </div>
  );
};

export {Box};
