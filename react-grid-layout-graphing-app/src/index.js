import {useState, useEffect, useMemo, createRef, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {wrapGrid} from 'animate-css-grid';
import {Button} from '@mui/material';
import {default as chance} from 'chance';
import {css, keyframes, cx} from '@emotion/css';
import {transform} from 'framer-motion';
import {default as Color} from 'color';
import {default as ColorString} from 'color-string';
import {usePrevious} from './hooks/usePrevious';
import '@fontsource/kaushan-script';
import './index.scss';

const generateGrid = ({cellColumnCount, cellHeightCount}) => {
  let gridRow = [];
  for (let i = 0; i < cellColumnCount; i++) {
    gridRow.push({});
  }
  let grid = [];
  for (let g = 0; g < cellHeightCount; g++) {
    grid.push(gridRow);
  }
  const seqList = [...Array(cellColumnCount * cellHeightCount).keys()];
  let g = 0;
  grid = grid.map((rowInfoList, i) => {
    let count = 0;
    return rowInfoList.map((cellInfo, j) => {
      count = count + 1;
      return {show: 1, count, seq: seqList[g++]};
    });
  });
  return grid;
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const StyledGrid = styled.div`
  border: 1px solid;
  display: grid;
  gap: 0.2rem;
  padding: 0.2rem;
  .box {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const info = ColorString.get(`#187498`);
const choicedColor = Color.rgb(info.value);
const gridWidth = 300;
const gridHeight = 300;

const App = () => {
  const gridDomRef = useRef(null);
  const [changeLayout, setChangeLayout] = useState(css``);
  const [cellColumnCount, setCellColumnCount] = useState(1);
  const [cellHeightCount, setCellHeightCount] = useState(1);
  const prev = useRef(1);
  const grid = useMemo(() => {
    return [...Array(cellColumnCount * cellHeightCount).keys()];
  }, [cellColumnCount, cellHeightCount]);

  const gridCellInfoList = useMemo(() => {
    return generateGrid({cellColumnCount, cellHeightCount});
  }, [cellColumnCount, cellHeightCount]);

  useEffect(() => {
    const gridDom = gridDomRef.current;
    wrapGrid(gridDom, {
      duration: 100,
      easing: `circInOut`,
      stagger: 11,
    });
  }, []);

  const handleClick = (e) => {
    const row = chance().integer({min: 1, max: 7});
    const col = row;
    let isDiff = true;
    if (prev.current !== row) {
      setCellColumnCount(col);
      setCellHeightCount(row);
      const a = css`
        grid-template-columns: repeat(${col}, 1fr);
        grid-template-rows: repeat(${row}, 1fr);
      `;
      setChangeLayout(a);
    }
    prev.current = row;
  };

  return (
    <>
      <Button variant={'outlined'} onClick={handleClick}>
        Change
      </Button>

      <StyledContainer>
        <StyledGrid
          ref={gridDomRef}
          className={cx(
            css`
              width: ${gridWidth}px;
              height: ${gridHeight}px;
              grid-template-columns: repeat(${cellColumnCount}, 1fr);
              grid-template-rows: repeat(${cellHeightCount}, 1fr);
            `,
            changeLayout
          )}
        >
          {gridCellInfoList.map((rowInfoList, i) => {
            return rowInfoList.map((cellInfo, j) => {
              const s = transform(
                cellInfo.seq,
                [Math.min(...grid), Math.max(...grid)],
                [0, 1]
              );
              if (cellInfo.show) {
                return (
                  <div
                    key={cellInfo.seq}
                    className={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <div
                      className={cx(
                        `box`,
                        css`
                          background: rgb(
                            ${choicedColor.saturate(s).color.join(', ')}
                          );
                        `
                      )}
                    ></div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={cellInfo.seq}
                    className={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <div className={cx(`box`)}></div>
                  </div>
                );
              }
            });
          })}
        </StyledGrid>
      </StyledContainer>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
