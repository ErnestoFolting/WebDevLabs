<script>
    import logo from './svelte-logo.svg';
  </script>

  <header>
    <div class="corner">
      <a href="https://kit.svelte.dev">
        <img src={logo} alt="SvelteKit" />
      </a>
    </div>
  </header>

  <style>
    header {
      display: flex;
      justify-content: space-between;
    }
    img {
      width: 2em;
      height: 2em;
      object-fit: contain;
    }
  </style>
