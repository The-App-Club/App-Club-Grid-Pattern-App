import { createRoot } from "react-dom/client";
import "@fontsource/inter";
import "./styles/index.scss";
import { css, cx } from "@emotion/css";
import { useEffect, useMemo, useState } from "react";
import { useTransition, animated } from "react-spring";
import { Button } from "@mui/material";
import { default as chance } from "chance";

const App = () => {
  const [tik, setTik] = useState(new Date());
  const [gridInfo, setGridInfo] = useState({
    cols: 5,
    rows: 5,
    cw: 50,
    ch: 50,
    gutter: 10,
  });
  const grid = useMemo(() => {
    let sh = 0,
      sw = 0;
    function generateMatrix({ cols, rows, cw, ch, gutter }) {
      let cx = 0,
        cy = 0,
        h = 0,
        s = 50,
        l = 50,
        hd = Math.floor(360 / (cols * rows)),
        resultInfoList = [];
      for (let i = 0; i < cols * rows; i++) {
        const resultInfo = {
          color: `hsla(${h},${s}%,${l}%,${1})`,
          y: cy,
          x: cx,
          width: cw,
          height: ch,
        };
        resultInfoList.push(resultInfo);
        if ((i + 1) % cols === 0) {
          cx = 0;
          cy += ch + gutter;
          sh += ch + gutter;
        } else {
          cx += cw + gutter;
          if ((i + 1) % rows === 1) {
            sw += cw + gutter;
          }
        }
        h += hd;
      }
      return { sw, sh, resultInfoList };
    }
    const { cols, rows, cw, ch, gutter } = gridInfo;
    const {
      sw: sumWidth,
      sh: sumHeight,
      resultInfoList,
    } = generateMatrix({ cols, rows, cw, ch, gutter });
    console.log(`a`);
    return {
      summary: { width: sumWidth, height: sumHeight },
      itemList: resultInfoList,
    };
  }, [tik, gridInfo]);

  const transitions = useTransition(grid.itemList, {
    key: (item) => {
      return item.color;
    },
    from: ({ x, y, width, height }) => {
      return {
        x,
        y,
        width,
        height,
        opacity: 0,
      };
    },
    enter: ({ x, y, width, height }) => {
      return {
        x,
        y,
        width,
        height,
        opacity: 1,
      };
    },
    update: ({ x, y, width, height }) => {
      return {
        x,
        y,
        width,
        height,
      };
    },
    leave: { height: 0, opacity: 0 },
    config: { mass: 1, tension: 50, friction: 1, frequency: 1, duration: 500 },
    trail: 25,
  });

  const handleClick = () => {
    const rect = chance().integer({ min: 1, max: 15 });
    const size = chance().integer({ min: 30, max: 50 });
    setTik(new Date());
    setGridInfo({
      cols: rect,
      rows: rect,
      cw: size,
      ch: size,
      gutter: chance().integer({ min: 3, max: 10 }),
    });
  };

  return (
    <>
      <Button variant={"outlined"} onClick={handleClick}>
        Do
      </Button>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          flex-direction: column;
        `}
      >
        <div
          className={cx(
            css`
              width: ${grid.summary.width}px;
              height: ${grid.summary.height}px;
            `,
            `grid`
          )}
        >
          {transitions((style, item) => (
            <animated.div
              style={style}
              className={cx(
                css`
                  position: absolute;
                  background: ${item.color};
                `,
                `cell`
              )}
            ></animated.div>
          ))}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(<App />);
