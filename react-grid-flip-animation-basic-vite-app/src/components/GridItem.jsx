import {css, cx} from '@emotion/css';
import {useState} from 'react';
import {GridItemAnimate} from './GridItemAnimate';
import {motion} from 'framer-motion';
import {useEffect} from 'react';

const expandedStyle = css`
  grid-row: span 2;
  grid-column: span 4;
  @media (max-width: 800px) {
    grid-column: span 2;
  }
`;

const GridItem = ({item}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = (e, item) => {
    setExpanded((expanded) => {
      return !expanded;
    });
  };

  return (
    <motion.div
      className={cx(
        css`
          min-width: 8rem;
          min-height: 12rem;
          background: #ffffff;
          :hover {
            cursor: pointer;
            background: #f7f7f7;
          }
        `,
        css`
          ${expanded ? expandedStyle : css``}
        `
      )}
      onClick={(e) => {
        handleClick(e, item);
      }}
    >
      <GridItemAnimate
        item={item}
        expanded={expanded}
        className={css`
          width: 80px;
          display: block;
        `}
      />
    </motion.div>
  );
};

export {GridItem};
