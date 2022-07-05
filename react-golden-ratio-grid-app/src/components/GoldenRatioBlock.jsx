import {cx, css} from '@emotion/css';
import goldenRatio from 'goldenratio';
import * as d3 from 'd3';
import {samples} from 'culori';

const GoldenRatioBlock = ({niceWidth = 300, data = []}) => {
  return (
    <div
      className={css`
        position: relative;
        display: grid;
        grid-template-columns: repeat(34, 1fr);
        grid-template-rows: repeat(21, 1fr);
        width: ${niceWidth}px;
        height: ${niceWidth / goldenRatio}px;
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
        }
      `}
    >
      <div
        className={css`
          grid-area: ${1} / ${1} / ${22} / ${22};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.2)};
          background-image: url(${data[0]});
          background-size: cover;
        `}
      >
        21
      </div>
      <div
        className={css`
          grid-area: ${1} / ${22} / ${14} / ${35};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.25)};
          background-image: url(${data[1]});
          background-size: cover;
        `}
      >
        13
      </div>
      <div
        className={css`
          grid-area: ${14} / ${27} / ${22} / ${35};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.3)};
          background-image: url(${data[2]});
          background-size: cover;
        `}
      >
        8
      </div>
      <div
        className={css`
          grid-area: ${14} / ${22} / ${17} / ${25};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.35)};
          background-image: url(${data[3]});
          background-size: cover;
        `}
      >
        3
      </div>
      <div
        className={css`
          grid-area: ${14} / ${25} / ${16} / ${27};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.4)};
          background-image: url(${data[4]});
          background-size: cover;
        `}
      >
        2
      </div>
      <div
        className={css`
          grid-area: ${16} / ${25} / ${17} / ${26};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.45)};
          background-image: url(${data[5]});
          background-size: cover;
        `}
      >
        {/* 1 */}
      </div>
      <div
        className={css`
          grid-area: ${16} / ${26} / ${17} / ${27};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.45)};
          background-image: url(${data[6]});
          background-size: cover;
        `}
      >
        {/* 1 */}
      </div>
      <div
        className={css`
          grid-area: ${17} / ${22} / ${22} / ${27};
          height: 100%;
          border: 1px solid;
          background: ${d3.interpolateOranges(0.5)};
          background-image: url(${data[7]});
          background-size: cover;
        `}
      >
        5
      </div>
    </div>
  );
};

export {GoldenRatioBlock};
