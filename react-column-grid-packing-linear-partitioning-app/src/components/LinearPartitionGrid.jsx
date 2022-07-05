import {css} from '@emotion/css';
import {useMemo, useRef, useEffect, useState} from 'react';
import {default as part} from 'linear-partitioning';
import data from '../data/dump.json';

const loadImageDom = ({imageURL}) => {
  return new Promise((resolve, reject) => {
    const imageDom = new Image();
    imageDom.onload = (event) => {
      resolve({
        dom: imageDom,
        aspectRatio: imageDom.width / imageDom.height,
        imageURL,
      });
    };
    imageDom.onerror = (event) => {
      reject(event);
    };
    imageDom.src = imageURL;
  });
};

const calculateRowHeight = ({imageInfoList, padding, rowWidth}) => {
  return Math.ceil(
    (rowWidth - padding * (imageInfoList.length - 1)) /
      imageInfoList
        .map((imageInfo) => {
          return imageInfo.aspectRatio;
        })
        .reduce((a, b) => {
          return a + b;
        }, 0)
  );
};

const createRow = ({count, top, height, padding, imageInfoList}) => {
  const result = imageInfoList.reduce(
    (acc, imageInfo) => {
      const left = acc.prev ? acc.prev.right + padding : 0;
      const width = Math.round(height * imageInfo.aspectRatio);
      const right = left + width;
      acc.prev = {
        right,
      };
      acc.list.push({
        top,
        left,
        width,
        height,
        right,
        image: imageInfo.dom,
        imageURL: imageInfo.imageURL,
      });
      return acc;
    },
    {prev: null, list: []}
  );
  return {count, list: result.list};
};

const LinearPartitionGrid = ({padding = 10, rowHeight = 220}) => {
  const containerDomRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const generateLinearPartitioningGrid = async ({data, isCreated}) => {
    const imageInfoList = await Promise.all(
      data.map((imageURL) => {
        return loadImageDom({imageURL});
      })
    );
    const container = containerDomRef.current;
    const ratios = imageInfoList.map((imageInfo) => {
      return imageInfo.aspectRatio;
    });
    let index = 0;
    let top = 0;
    const rowWidth = container.clientWidth;
    const k = Math.max(
      Math.min(
        Math.floor(
          ratios.reduce((a, b) => {
            return a + b;
          }, 0) *
            (rowHeight / rowWidth)
        ),
        ratios.length
      ),
      1
    );
    const partitions = part(ratios, k);
    const resultList = [];
    partitions.map((x) => {
      const data = imageInfoList.slice(index, index + x.length);
      const height = calculateRowHeight({
        imageInfoList: data,
        padding,
        rowWidth,
      });
      const {count, list} = createRow({
        count: x.length,
        top,
        height,
        padding,
        imageInfoList: data,
      });
      resultList.push(list);
      index = index + count;
      top = top + height + padding;
    });
    if (!isCreated) {
      return;
    }
    setGrid(resultList);
  };

  const handleResize = (e) => {
    // https://stackoverflow.com/a/66071205/15972569
    let active = true;
    generateLinearPartitioningGrid({data, isCreated: active});
    return () => {
      active = false;
    };
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerDomRef}
      className={css`
        position: relative;
        width: 100%;
      `}
    >
      {grid &&
        grid.map((images, i) => {
          return images.map((imageInfo, j) => {
            return (
              <img
                key={i + j}
                className={css`
                  position: absolute;
                  top: ${imageInfo.top}px;
                  left: ${imageInfo.left}px;
                  width: ${imageInfo.width}px;
                  height: ${imageInfo.height}px;
                `}
                src={imageInfo.imageURL}
                alt={''}
              />
            );
          });
        })}
    </div>
  );
};

export {LinearPartitionGrid};
