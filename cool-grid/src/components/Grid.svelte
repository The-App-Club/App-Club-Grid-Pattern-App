<script>
  import {createEventDispatcher} from 'svelte';
  let dispatch = createEventDispatcher();
  export let gridWidth;
  export let gridHeight;
  export let rowSize;
  export let colSize;
  export let cellSize;
  export let gapSize;
  $: gridRoot = `
width: ${gridWidth}px;
height: ${gridHeight}px;
grid-template-columns: ${typeof colSize === 'number' ? `repeat(${colSize}, ${cellSize}px)` : colSize};
grid-template-rows: ${typeof rowSize === 'number' ? `repeat(${rowSize}, ${cellSize}px)` : rowSize};
grid-gap: ${gapSize}px;
background-image: url('https://www.transparenttextures.com/patterns/graphy-dark.png');
background-position: center;`;

  let parameter = {
    gridWidth: gridWidth,
    gridHeight: gridHeight,
    cellSize: cellSize,
    rowSize: rowSize,
    colSize: colSize,
    gapSize: gapSize,
  };

  let controllerInfo = {
    'Grid Width': parameter.gridWidth,
    'Grid Height': parameter.gridHeight,
    'Cell Size': parameter.cellSize,
    'Row Size': parameter.rowSize,
    'Col Size': parameter.colSize,
    'Gap Size': parameter.gapSize,
  };

  window.gui.add(controllerInfo, 'Grid Width', 300, window.innerHeight * 0.8, 10).onChange((event) => {
    detectChangeParameter(event, 'Grid Width');
  });
  window.gui.add(controllerInfo, 'Grid Height', 300, window.innerHeight * 0.8, 10).onChange((event) => {
    detectChangeParameter(event, 'Grid Height');
  });
  window.gui.add(controllerInfo, 'Cell Size', 10, 100, 1).onChange((event) => {
    detectChangeParameter(event, 'Cell Size');
  });
  window.gui.add(controllerInfo, 'Row Size', 10, 100, 10).onChange((event) => {
    detectChangeParameter(event, 'Row Size');
  });
  window.gui.add(controllerInfo, 'Col Size', 10, 100, 10).onChange((event) => {
    detectChangeParameter(event, 'Col Size');
  });
  window.gui.add(controllerInfo, 'Gap Size', 10, 100, 1).onChange((event) => {
    detectChangeParameter(event, 'Gap Size');
  });

  function detectChangeParameter(event, keyName) {
    if (keyName === 'Grid Width') {
      parameter.gridWidth = event;
    }
    if (keyName === 'Grid Height') {
      parameter.gridHeight = event;
    }
    if (keyName === 'Cell Size') {
      parameter.cellSize = event;
    }
    if (keyName === 'Row Size') {
      parameter.rowSize = event;
    }
    if (keyName === 'Col Size') {
      parameter.colSize = event;
    }
    if (keyName === 'Gap Size') {
      parameter.gapSize = event;
    }

    dispatch('changeParameterFromGrid', parameter);
  }
</script>

<div class="grid" style={gridRoot}>
  <slot />
</div>

<style>
  .grid {
    display: grid;
    border: 1px solid #000;
  }
</style>
