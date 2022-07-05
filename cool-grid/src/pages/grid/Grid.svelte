<script>
  import Grid from '../../components/Grid.svelte';
  import GridItem from '../../components/GridItem.svelte';
  let gridItemId;
  let gridWidth = 500;
  let gridHeight = 500;
  let cellSize = 50;
  let rowSize = 10;
  let colSize = 10;
  let gapSize = 0;

  function handleChangeFromGrid(e) {
    const detail = e.detail;
    gridWidth = detail.gridWidth;
    gridHeight = detail.gridHeight;
    cellSize = detail.cellSize;
    rowSize = detail.rowSize;
    colSize = detail.colSize;
    gapSize = detail.gapSize;
    console.log('handleChangeFromGrid', detail);
  }

  let cellInfoList = [...new Array(10).fill(0)].map((item, index) => {
    return {from: {x: index, y: index}, to: {x: index + 1, y: index + 1}};
  });
</script>

<div class="center">
  <Grid {gridWidth} {gridHeight} {rowSize} {colSize} {gapSize} {cellSize} on:changeParameterFromGrid={handleChangeFromGrid}>
    {#each cellInfoList as cellInfo, index}
      <GridItem x1={cellInfo.from.x} y1={cellInfo.from.y} x2={cellInfo.to.x} y2={cellInfo.to.y}>xxx</GridItem>
    {/each}
  </Grid>
</div>

<style>
  .center {
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
  }
</style>
