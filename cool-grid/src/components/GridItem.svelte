<script>
  export let x1;
  export let x2;
  export let y1;
  export let y2;
  let backgroundColor = '#000';
  $: gridAreaStyle = `grid-area: ${y1 + 1} / ${x1 + 1} / ${y2 + 1} / ${x2 + 1}; background-color: ${backgroundColor}`;

  let parameter = {
    backgroundColor: backgroundColor,
  };

  let controllerInfo = {
    'Background Color': parameter.backgroundColor,
  };

  window.gui.addColor(controllerInfo, 'Background Color').onChange((event) => {
    detectChangeParameter(event, 'Background Color');
  });

  function detectChangeParameter(event, keyName) {
    if (keyName === 'Background Color') {
      backgroundColor = event;
      parameter.backgroundColor = event;
    }
  }
</script>

<div class="grid-item" style={gridAreaStyle}>
  <slot />
</div>

<style>
  .grid-item {
    color: #fff;
  }
</style>
