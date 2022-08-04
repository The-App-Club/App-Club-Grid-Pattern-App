import {css} from '@emotion/css';
import {
  Menu,
  ControlledMenu,
  MenuItem,
  MenuButton,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {memo} from 'react';
import {RiDeleteBin6Line, RiFileCopyLine, RiMoreFill} from 'react-icons/ri';

const Item = ({item}) => {
  const handleCopy = (e) => {
    console.log(`copy`, item);
  };

  const handleDelete = (e) => {
    console.log(`delete`, item);
  };

  return (
    <li
      className={css`
        position: relative;
        width: 100%;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          gap: 0.2rem;
        `}
      >
        <img
          src={item.url}
          alt={''}
          className={css`
            display: block;
            object-fit: contain;
            width: 80px;
            height: 80px;
          `}
        />
        <h3
          className={css`
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            @media (max-width: 768px) {
              font-size: 0.95rem;
            }
          `}
        >
          {item.semiTitle}
        </h3>
      </div>
      <Menu
        menuButton={
          <div
            className={css`
              position: absolute;
              top: 0;
              right: 0;
            `}
          >
            <RiMoreFill size={24} />
          </div>
        }
      >
        <MenuItem onClick={handleCopy}>
          <RiFileCopyLine size={24} />
          <span
            className={css`
              margin-left: 1rem;
            `}
          >
            Copy
          </span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <RiDeleteBin6Line size={24} />
          <span
            className={css`
              margin-left: 1rem;
            `}
          >
            Delete
          </span>
        </MenuItem>
      </Menu>
    </li>
  );
};
export default memo(Item);
