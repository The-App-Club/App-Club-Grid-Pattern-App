import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Button} from '@mui/material';
import shuffle from 'lodash/shuffle';
import {default as chance} from 'chance';
import {useControls} from 'leva';
import {Forest} from './components/Forest';

import '@fontsource/kaushan-script';
import './index.scss';

const App = () => {
  const [data, setData] = useState([]);
  const parameter = useControls({
    width: 700,
    height: 700,
    minLeafSize: 30,
    maxLeafSize: 100,
    gutter: 10,
  });

  const a = useMemo(() => {
    class Leaf {
      constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
      }
    }

    function split(leftChild, rightChild, x, y, width, height) {
      if (leftChild || rightChild) {
        return {canSplit: false};
      }

      let isSplitHeight = Math.random() > 0.5;

      if (width > height && width / height >= 1.25) {
        isSplitHeight = false;
      }

      if (height > width && height / width >= 1.25) {
        isSplitHeight = true;
      }

      const max = (isSplitHeight ? height : width) - parameter.minLeafSize;

      if (max <= parameter.minLeafSize) {
        return {canSplit: false};
      }

      const niceSize = chance().integer({min: parameter.minLeafSize, max});

      if (isSplitHeight) {
        leftChild = new Leaf(x, y, niceSize, width);
        rightChild = new Leaf(x, y + niceSize, height - niceSize, width);
      } else {
        leftChild = new Leaf(x, y, height, niceSize);
        rightChild = new Leaf(x + niceSize, y, height, width - niceSize);
      }

      return {canSplit: true, left: leftChild, right: rightChild};
    }

    function splitSection({leafInfoList}) {
      let willSplitTry = true;

      // https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268

      while (willSplitTry) {
        willSplitTry = false;
        for (let index = 0; index < leafInfoList.length; index++) {
          let leafInfo = leafInfoList[index];
          if (!leafInfo.leftChild && !leafInfo.rightChild) {
            if (
              leafInfo.width > parameter.maxLeafSize ||
              leafInfo.height > parameter.maxLeafSize
            ) {
              const {canSplit, left, right} = {
                ...split(
                  leafInfo.leftChild,
                  leafInfo.rightChild,
                  leafInfo.x,
                  leafInfo.y,
                  leafInfo.width,
                  leafInfo.height
                ),
              };
              if (canSplit) {
                Object.assign(leafInfo, {leftChild: left, rightChild: right});
                leafInfoList.push(leafInfo.leftChild);
                leafInfoList.push(leafInfo.rightChild);
                willSplitTry = true;
              } else {
                // console.log(`a`);
              }
            } else {
              // console.log(`b`);
            }
          } else {
            // console.log(`c`);
          }
        }
      }

      return leafInfoList;
    }
    setData([]);
    const data = splitSection({
      leafInfoList: [new Leaf(0, 0, parameter.height, parameter.width)],
    });
    setData(data);
  }, [parameter]);

  return (
    <div
      className={css`
        display: grid;
        place-items: center;
        min-height: 100vh;
        width: 100%;
      `}
    >
      <Forest
        data={data}
        width={parameter.width}
        height={parameter.height}
        gutter={parameter.gutter}
      />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
