import * as R from "ramda";
import * as d3 from "d3";

const generateMondrian = ({ value, depth = 0, subdivisions, maxDepth }) => {
  const N = Math.ceil(Math.random() * (subdivisions - depth));
  return {
    value,
    children:
      depth < maxDepth
        ? R.range(1, N).map((n, index) =>
            generateMondrian({
              value: value / N,
              depth: depth + 1,
              subdivisions,
              maxDepth,
            })
          )
        : [],
  };
};

const width = 500;
const height = 500;
const gutter = 0;

const data = generateMondrian({
  value: 100,
  depth: 0,
  subdivisions: 6,
  maxDepth: 14,
});

const root = d3
  .hierarchy(data)
  .sum(function (d) {
    return d.value;
  })
  .sort(function (a, b) {
    return b.height - a.height || b.value - a.value;
  });

const treemap = d3.treemap().size([width, height]).padding(gutter).round(true);

const node = treemap(root);

const nice = ({ node, resultInfoList = [] }) => {
  const { x0, y0, x1, y1, children } = node;
  const width = x1 - x0;
  const height = y1 - y0;
  if (width && height) {
    resultInfoList.push({
      top: y0,
      left: x0,
      width,
      height,
    });
  }
  if (children) {
    return children.map((node, index) => {
      return nice({ node, resultInfoList });
    });
  }
};
const resultInfoList = [];
nice({ node, resultInfoList });
console.log(JSON.stringify(resultInfoList));
