<script>
  import {link} from 'svelte-spa-router';
  let pageName = 'Home Page';
</script>

<main>
  <h1>{pageName}!</h1>
  <a href="/grid" use:link>Grid</a>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1px;
    max-width: 240px;
    margin: 0 auto;
  }

  a {
    display: block;
  }
</style>
