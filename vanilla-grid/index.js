// https://codepen.io/skybirdtrill/pen/GZOdZX
// https://www.nintendo.co.jp/ds/atrj/rule/index.html
// http://blog.livedoor.jp/mkomiz/archives/4296322.html
// https://www.youtube.com/watch?v=ZJj-9HqRpDc

function createPreviewArea() {
  const gridItemNextDom = document.querySelector('.grid-item-next');
  gridItemNextDom.style.width = `${parameter.cellSize * 4}px`;
  gridItemNextDom.style.height = `${parameter.cellSize * 4}px`;
}

function attachGridStyle() {
  const gridDom = document.querySelector('.grid');
  gridDom.style = gridStyle;
  gridDom.style.width = `${parameter.cellSize * parameter.colSize}px`;
  gridDom.style.height = `${parameter.cellSize * parameter.rowSize}px`;
}

function attachGridItemStyle(gridItemStyle, selectorClassName) {
  const gridItemNextDom = document.querySelector(selectorClassName);
  const gridItemDom = document.createElement('div');
  gridItemDom.classList.add('grid-item');
  gridItemDom.style = gridItemStyle;
  gridItemNextDom.appendChild(gridItemDom);
}

function createGridStyle() {
  gridStyle = `
  grid-template-columns: repeat(${parameter.colSize}, ${parameter.cellSize}px);
  grid-template-rows: repeat(${parameter.rowSize}, ${parameter.cellSize}px);
  grid-gap: 0px;
  background-image: url('https://www.transparenttextures.com/patterns/graphy-dark.png');
  background-position: center;`;
}

function createGridItemStyle(x1, y1, x2, y2) {
  return `grid-area: ${y1 + 1} / ${x1 + 1} / ${y2 + 1} / ${x2 + 1};`;
}

function makePreviewGridItemStyle() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const gridItemStyle = createGridItemStyle(col, row, col + 1, row + 1);
      attachGridItemStyle(gridItemStyle, '.grid-item-next');
    }
  }
}

function makeGridItemStyle() {
  for (let row = 0; row < parameter.rowSize; row++) {
    for (let col = 0; col < parameter.colSize; col++) {
      const gridItemStyle = createGridItemStyle(col, row, col + 1, row + 1);
      attachGridItemStyle(gridItemStyle, '.grid');
    }
  }
}

function resetStyle() {
  gridStyle = '';
}

let gridStyle;

let parameter = {
  cellSize: 50,
  rowSize: 15,
  colSize: 10,
};

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

function niceRolling() {
  resetStyle();
  createPreviewArea();
  createGridStyle();
  attachGridStyle();
  makeGridItemStyle();
  makePreviewGridItemStyle();
}

function loop() {
  requestAnimationFrame(loop);
  stats.begin();
  stats.end();
}

loop();
niceRolling();

window.addEventListener('resize', () => {
  if (window.matchMedia('(max-width:1288px)').matches) {
    // https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia
    parameter.cellSize = 20;
  } else {
    parameter.cellSize = 50;
  }
  niceRolling();
});
