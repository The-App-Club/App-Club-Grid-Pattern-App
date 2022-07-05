class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(isShow) {
    const gridItemStyle = createGridItemStyle(
      this.x,
      this.y,
      this.x + 1,
      this.y + 1,
      isShow
    );
    attachGridItemStyle(gridItemStyle, this.x, this.y);
  }
}

class Mino {
  constructor(x, y, rot, shape) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.shape = shape;
  }

  calcBlocks() {
    let blocks = [];
    switch (this.shape) {
      case 0:
        blocks = [
          new Block(-1, 0),
          new Block(0, 0),
          new Block(0, -1),
          new Block(1, 0),
        ];
        break; //T
      case 1:
        blocks = [
          new Block(-1, -1),
          new Block(0, -1),
          new Block(0, 0),
          new Block(1, 0),
        ];
        break; //Z
      case 2:
        blocks = [
          new Block(-1, 0),
          new Block(0, 0),
          new Block(0, -1),
          new Block(1, -1),
        ];
        break; //S
      case 3:
        blocks = [
          new Block(-1, -2),
          new Block(-1, -1),
          new Block(-1, 0),
          new Block(0, 0),
        ];
        break; //L
      case 4:
        blocks = [
          new Block(0, -2),
          new Block(0, -1),
          new Block(-1, 0),
          new Block(0, 0),
        ];
        break; //J
      case 5:
        blocks = [
          new Block(-1, -1),
          new Block(-1, 0),
          new Block(0, 0),
          new Block(0, -1),
        ];
        break; //O
      case 6:
        blocks = [
          new Block(-2, 0),
          new Block(-1, 0),
          new Block(0, 0),
          new Block(1, 0),
        ];
        break; //I
    }

    if (this.rot < 0) {
      // 左回転
      for (let r = this.rot; r < 0; r++) {
        // rotate 90 回転行列 BlockをVec2としてみなす
        blocks = blocks.map((block) => {
          return new Block(block.y, -block.x);
        });
      }
    } else {
      // 右回転
      for (let r = 0; r < this.rot; r++) {
        // rotate 90 回転行列 BlockをVec2としてみなす
        blocks = blocks.map((block) => {
          return new Block(-block.y, block.x);
        });
      }
    }

    return blocks;
  }

  draw() {
    let blocks = this.calcBlocks();
    blocks.map((block) => ((block.x += this.x), (block.y += this.y)));
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      block.draw(1);
    }
  }

  copy() {
    return new Mino(this.x, this.y, this.rot, this.shape);
  }
}

class Field {
  constructor(rowSize, colSize) {
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.tiles = Field.makeTiles(rowSize, colSize);
  }

  static makeTiles(rowSize, colSize) {
    let tiles = [...new Array(rowSize + 1).fill(0)].map((i) => {
      const tmp = [...new Array(colSize + 2).fill(0)];
      tmp[0] = 1;
      tmp[tmp.length - 1] = 1;
      return tmp;
    });

    tiles[tiles.length - 1] = [...new Array(10 + 2).fill(1)];
    return tiles;
  }

  tileAt(x, y) {
    return this.tiles[y][x];
  }

  setBlock(x, y, isShow) {
    this.tiles[y][x] = isShow;
  }

  findLineFilled() {
    for (let y = 0; y < this.rowSize; y++) {
      const isFilled = this.tiles[y].every((x) => {
        return x === 1;
      });
      if (isFilled) {
        return y;
      }
    }
    return -1;
  }

  cutLine(y) {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    this.tiles.splice(y, 1);
    const tmp = [...new Array(this.colSize + 2).fill(0)];
    tmp[0] = 1;
    tmp[tmp.length - 1] = 1;
    this.tiles.unshift(tmp);
  }

  draw(rowSize, colSize) {
    for (let y = 0; y < rowSize + 1; y++) {
      for (let x = 0; x < colSize + 2; x++) {
        new Block(x, y).draw(this.tileAt(x, y));
      }
    }
  }
}

function attachGridStyle(gridStyle, colSize, rowSize, cellSize) {
  const gridDom = document.querySelector('.grid');
  gridDom.style = gridStyle;
  gridDom.style.width = `${cellSize * colSize}px`;
  gridDom.style.height = `${cellSize * rowSize}px`;
}

function attachGridItemStyle(gridItemStyle, x, y) {
  const gridDom = document.querySelector('.grid');
  const existsGridItemDom = gridDom.querySelector(
    `[data-x="${x}"][data-y="${y}"]`
  );
  if (!existsGridItemDom) {
    const gridItemDom = document.createElement('div');
    gridItemDom.setAttribute('data-x', x);
    gridItemDom.setAttribute('data-y', y);
    gridItemDom.classList.add('grid-item');
    gridItemDom.style = gridItemStyle;
    gridDom.appendChild(gridItemDom);
  } else {
    existsGridItemDom.style = gridItemStyle;
  }
}

function createGridStyle(colSize, rowSize, cellSize) {
  return `
  grid-template-columns: repeat(${colSize}, ${cellSize}px);
  grid-template-rows: repeat(${rowSize}, ${cellSize}px);
  grid-gap: 0px;
  background-image: url('https://www.transparenttextures.com/patterns/graphy-dark.png');
  background-position: center;`;
}

function createGridItemStyle(x1, y1, x2, y2, isShow) {
  return `grid-area: ${y1 + 1} / ${x1 + 1} / ${y2 + 1} / ${x2 + 1};visibility:${
    isShow ? 'visible' : 'hidden'
  };`;
}

function getRandomRangeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Game {
  constructor(rowSize, colSize, cellSize) {
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.field = new Field(rowSize, colSize);
    this.mino = new Mino(5, 3, 0, 0);
    this.minoDelta = 0;
    this.minoSpeedDelta = 0;
    this.minoRotDelta = 0;
    const gridStyle = createGridStyle(colSize + 2, rowSize + 1, cellSize);
    attachGridStyle(gridStyle, colSize + 2, rowSize + 1, cellSize);
    this.fc = 0;
  }

  isGameOver() {
    return this.field.tiles[0].slice(1, 11).some((item) => {
      return item === 1;
    });
  }

  static makeMino() {
    return new Mino(5, 2, 0, getRandomRangeNumber(0, 7));
  }

  static isMinoMovable(mino, filed) {
    const blocks = mino.calcBlocks();
    return blocks.every((block) => {
      return filed.tileAt(mino.x + block.x, mino.y + block.y) === 0;
    });
  }

  draw() {
    if (this.minoSpeedDelta !== 0) {
      let copiedMino = this.mino.copy();
      copiedMino.y += this.minoSpeedDelta;
      if (Game.isMinoMovable(copiedMino, this.field)) {
        this.mino.y += this.minoSpeedDelta;
      }
      this.minoSpeedDelta = 0;
    }

    if (this.minoRotDelta !== 0) {
      let copiedMino = this.mino.copy();
      copiedMino.rot += this.minoRotDelta;
      if (Game.isMinoMovable(copiedMino, this.field)) {
        this.mino.rot += this.minoRotDelta;
      }
      this.minoRotDelta = 0;
    }

    if (this.fc % 15 === 14) {
      let copiedMino = this.mino.copy();
      copiedMino.y += 1;
      if (Game.isMinoMovable(copiedMino, this.field)) {
        this.mino.y += 1;
      } else {
        const blocks = this.mino.calcBlocks();
        for (let index = 0; index < blocks.length; index++) {
          const block = blocks[index];
          this.field.setBlock(this.mino.x + block.x, this.mino.y + block.y, 1);
        }
        // 次のミノを用意
        this.mino = Game.makeMino();

        let line;
        while ((line = this.field.findLineFilled()) !== -1) {
          this.field.cutLine(line);
        }
      }
    }

    if (this.minoDelta !== 0) {
      let copiedMino = this.mino.copy();
      copiedMino.x += this.minoDelta;
      if (Game.isMinoMovable(copiedMino, this.field)) {
        this.mino.x += this.minoDelta;
      }
      this.minoDelta = 0;
    }
    this.field.draw(this.rowSize, this.colSize);
    this.mino.draw();

    this.fc = this.fc + 1;

    if (this.isGameOver()) {
      game = null;
      window.alert('Game Over!');
    }
  }
}

function handleChangeCellSize() {
  if (window.matchMedia('(max-width:1288px)').matches) {
    // https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia
    parameter.cellSize = 20;
  } else {
    parameter.cellSize = 50;
  }
}

function handleKeyDown() {
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    try {
      switch (e.keyCode) {
        case 37: // Left
          game.minoDelta = -1;
          break;
        case 39: // Right
          game.minoDelta = 1;
          break;
        case 40: // Down
          game.minoSpeedDelta = 1;
          break;
        case 32: // Space
          game.minoRotDelta = 1;
          break;
      }
    } catch (error) {}
  });
}

let parameter = {
  rows: 15,
  cols: 10,
  cellSize: 50,
};

let game;
let reqId;

function setUp() {
  game = new Game(parameter.rows, parameter.cols, parameter.cellSize);
  game.draw();
}

function loop() {
  try {
    game.draw();
    reqId = window.requestAnimationFrame(loop);
  } catch (error) {
    console.log('Game Over!');
  }
}

handleKeyDown();
setUp();
window.addEventListener('resize', handleChangeCellSize);
loop();

// TODO iro
