<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/home/Home.svelte';
  import Grid from './pages/grid/Grid.svelte';
  // https://github.com/EmilTholin/svelte-routing/issues/122
  export let name = '';

  // https://github.com/ItalyPaleAle/svelte-spa-router#define-your-routes
  export const routes = {
    '/': Home,

    '/grid': Grid,
  };
  console.log(name);

  let stats;
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = 0;
  stats.domElement.style.top = 0;
  document.body.appendChild(stats.domElement);

  function loop() {
    requestAnimationFrame(loop);
    stats.begin();
    stats.end();
  }

  loop();

  const gui = new dat.GUI();
  gui.width = 300;
  window.gui = gui;
</script>

<Router {routes} />

<style>
</style>
