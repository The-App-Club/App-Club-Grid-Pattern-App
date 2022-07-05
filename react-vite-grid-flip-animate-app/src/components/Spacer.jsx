import {css} from '@emotion/css';

const Spacer = ({height = `1rem`}) => {
  return (
    <div
      className={css`
        width: 100%;
        max-width: 100%;
        min-height: ${height};
        height: 100%;
      `}
    ></div>
  );
};

export {Spacer};
