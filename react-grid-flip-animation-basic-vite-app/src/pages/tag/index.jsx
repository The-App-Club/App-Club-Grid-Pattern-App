import {css, cx} from '@emotion/css';
import {useMemo, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {wrapGrid} from 'animate-css-grid';

import {mediaByTag} from '../../components/Gallery';
import {GridItem} from '../../components/GridItem';
import {useEffect} from 'react';

const TagPage = () => {
  const gridDomRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  const location = useLocation();
  const {
    state: {title, assetPath},
  } = location;

  const data = useMemo(() => {
    return mediaByTag({tag: assetPath}).map((item) => {
      return {
        ...item,
        url: new URL(item.url, import.meta.url).href,
      };
    });
  }, [assetPath]);

  useEffect(() => {
    wrapGrid(gridDomRef.current, {
      easing: 'backInOut',
      stagger: 10,
      duration: 400,
      onStart: function (e) {
        const html = document.documentElement;
        const body = html.querySelector('body');
        html.classList.add('loading');
        body.classList.add('loading');
      },
      onEnd: function (e) {
        const html = document.documentElement;
        const body = html.querySelector('body');
        html.classList.remove('loading');
        body.classList.remove('loading');
      },
    });
  }, []);

  return (
    <div
      className={css`
        background: #ffe9b9;
        max-width: 60rem;
        width: 100%;
        margin: 0 auto;
        h2 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 1rem 0;
        }
        h3 {
          margin: 0;
        }
      `}
    >
      <h2>TagPage</h2>
      <div
        className={css`
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Link
          to={'/'}
          className={css`
            position: absolute;
            left: 1rem;
            display: block;
            color: black;
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          `}
        >
          Back
        </Link>
        <h3>{title}</h3>
      </div>
      <div
        ref={gridDomRef}
        className={css`
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          @media (max-width: 1400px) {
            grid-template-columns: repeat(5, 1fr);
          }
          @media (max-width: 1000px) {
            grid-template-columns: repeat(4, 1fr);
          }
          @media (max-width: 900px) {
          }
          @media (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
          }
          padding: 1rem;
          gap: 1rem;
        `}
      >
        {data.map((item, index) => {
          return <GridItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export {TagPage};
