import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {Scrollbars} from 'rc-scrollbars';
import data from './data/dump.js';
import logo from './assets/logo.png';
import '@fontsource/inter';
import './styles/index.scss';
import {default as Header} from './components/Header';
import Item from './components/Item.jsx';

const App = () => {
  const [displayType, setDisplayType] = useState(`grid`);

  const handleClick = useCallback((e) => {
    setDisplayType((prevDisplayType) => {
      if (prevDisplayType === `grid`) {
        return `list`;
      } else {
        return `grid`;
      }
    });
  }, []);

  const handleSearch = useCallback((e) => {
    console.log(e);
  }, []);

  return (
    <div>
      <main>
        <div
          className={css`
            max-width: 40rem;
            width: 100%;
            margin: auto;
            padding-top: 5rem;
            @media (max-width: 768px) {
              padding-top: initial;
            }
          `}
        >
          <div
            className={css`
              padding: 1rem 0;
              display: flex;
              align-items: center;
            `}
          >
            <img src={logo} alt={`logo`} width={80} />
            <h1
              className={css`
                font-size: 1.35rem;
              `}
            >
              Bebeop Gallery
            </h1>
          </div>

          <Scrollbars
            className={css`
              width: 100%;
              min-height: 40rem;
              max-height: 80rem;
              @media (max-width: 768px) {
                min-height: 100vh;
              }
              overflow: hidden;
              overflow-y: auto;
              ul {
                li {
                  &:hover {
                    cursor: pointer;
                    background: #f7f7f7;
                  }
                }
                &.list {
                  display: flex;
                  justify-content: flex-start;
                  align-items: flex-start;
                  flex-direction: column;
                  gap: 1rem;
                }
                &.grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 1rem;
                  > li {
                  }
                }
              }
            `}
          >
            <Header
              headerTitle={`Hello`}
              handleClick={handleClick}
              handleSearch={handleSearch}
              displayType={displayType}
            />
            <ul
              className={cx(
                css`
                  list-style: none;
                  padding: 1rem 0;
                `,
                `${displayType}`
              )}
            >
              {data.map((item, index) => {
                return <Item key={index} item={item} />;
              })}
            </ul>
          </Scrollbars>
        </div>
      </main>
      {/* <footer
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 3rem;
        `}
      >
        Bye
      </footer> */}
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
