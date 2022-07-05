import {createRoot} from 'react-dom/client';
import {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {css} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
import {grid} from 'grid-template-parser';
import {default as chance} from 'chance';
import {arrange, asc, tidy} from '@tidyjs/tidy';
import {samples, interpolate, formatHex} from 'culori';

import * as R from 'ramda';
import * as d3 from 'd3';

const width = 300;
const height = 300;
const padding = 4;

const App = () => {
  const svgDomRef = useRef(null);
  const data = useMemo(() => {
    const bebop = samples(13)
      .map(
        interpolate([
          '#FFE6E6',
          '#DAEAF1',
          '#3BACB6',
          '#646FD4',
          '#36AE7C',
          '#F24C4C',
          '#2F8F9D',
          '#BDF2D5',
          '#EC9B3B',
        ])
      )
      .map(formatHex)
      .map((color, index) => {
        return {color, isActive: index % 2 === 0 ? true : false};
      });
    const dataset = tidy(bebop, arrange(['color', asc('isActive')]));
    // to use stratify need array items of {name: foo, parent: bar, value: baz}
    // create root
    const dataForStratify = [{name: 'root', parent: null, value: null}];

    // add I children for unique colors
    const colors = [...new Set(dataset.map((k) => k.color))];
    colors.forEach((k) =>
      dataForStratify.push({name: k, parent: 'root', value: null})
    );
    // add active inactive children for each color
    const colorCounts = colors.reduce((a, c) => {
      const colorItems = dataset.filter((k) => k.color === c);
      const actives = colorItems.filter((k) => k.isActive === true).length;
      const inactives = colorItems.filter((k) => k.isActive === false).length;
      a.push({
        name: 'active',
        parent: c,
        value: actives,
      });
      a.push({
        name: 'inactive',
        parent: c,
        value: inactives,
      });
      return a;
    }, []);
    colorCounts.forEach((k) => dataForStratify.push(k));
    return dataForStratify;
  }, []);

  const doStratify = (data) => {
    return d3
      .stratify()
      .parentId((d) => d.parent)
      .id((d) => d.name)(data);
  };

  const makeTree = (rootNode) => {
    return d3
      .treemap()
      .tile(d3.treemapResquarify)
      .size([width, height])
      .padding(padding)(rootNode);
  };

  const color = (d) => {
    if (!d.parent) {
      return '#fff';
    } else {
      return d.parent.data.name;
    }
  };

  const makeRectPackingData = (data) => {
    const stratifyRootNode = doStratify(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    const tree = makeTree(stratifyRootNode);
    const groupedTree = d3.group(tree, (d) => d.height);
    return groupedTree;
  };

  useEffect(() => {
    const rectPackingData = makeRectPackingData(data);
    const svgDom = d3.select(svgDomRef.current);
    const node = svgDom
      .selectAll('g')
      .data(rectPackingData)
      .join('g')
      .selectAll('g')
      .data((d) => {
        return d[1];
      })
      .join('g')
      .attr('transform', (d) => {
        // left top
        return `translate(${d.x0},${d.y0})`;
      });

    node
      .append('rect')
      .attr('fill', (d) => {
        return color(d);
      })
      .attr('width', (d) => {
        // right bottom - left top
        return d.x1 - d.x0;
      })
      .attr('height', (d) => {
        // right bottom - left top
        return d.y1 - d.y0;
      });
  }, []);
  return <svg ref={svgDomRef} width={width} height={height} />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
