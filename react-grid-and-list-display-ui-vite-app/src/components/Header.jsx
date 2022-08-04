import {css} from '@emotion/css';
import {memo} from 'react';
import {BsGrid, BsListUl} from 'react-icons/bs';
import {RiSearchLine} from 'react-icons/ri';

const Header = ({headerTitle, displayType, handleSearch, handleClick}) => {
  return (
    <div
      className={css`
        position: sticky;
        top: 0;
        backdrop-filter: blur(10px);
        padding: 1rem 0.5rem;
        background: rgba(255, 255, 255, 0.3);
        z-index: 1;
        min-height: 3rem;
        display: flex;
        align-items: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
        `}
      >
        <h2 className={css``}>{headerTitle}</h2>
        <div
          className={css`
            position: absolute;
            top: 0;
            right: 40px;
            :hover {
              cursor: pointer;
            }
          `}
          onClick={handleSearch}
        >
          <RiSearchLine size={32} />
        </div>
        <div
          className={css`
            position: absolute;
            top: 0;
            right: 0;
            :hover {
              cursor: pointer;
            }
          `}
          onClick={handleClick}
        >
          {displayType === `grid` ? (
            <BsGrid size={32} />
          ) : (
            <BsListUl size={32} />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
