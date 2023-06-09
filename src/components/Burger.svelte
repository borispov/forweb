<script>
  import { fade } from "svelte/transition";
  export let handler;

  $: [y1, y2, y3, _x1, x2, x3] = ["16", "16", "8", "0", "0", "0"];

  // Some poor burger animations
  let svgHover = (e) => {
    if (e.type === "mouseleave") {
      y1 = "16";
      y2 = "16";
      y3 = "8";
      x2 = 0;
      x3 = 0;
    } else {
      y1 = "12";
      y2 = "12";
      y3 = "6";
      x2 = "4";
      x3 = "10";
    }
  };
</script>

<button
  on:click={handler}
  type="button"
  aria-label="Open Menu"
  aria-controls="header-menu"
  aria-expanded="false"
  aria-hidden="false"
  class="HeaderNav_toggleBtn__19JOa"
>
  <svg
    aria-hidden="true"
    transition:fade
    on:mouseenter={svgHover}
    on:mouseleave={svgHover}
    viewBox="0 0 16 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="2" width={y1} height="1" />
    <rect x={x2} y="7" width={y2} height="1" />
    <rect x={x3} y="12" width={y3} height="1" />
  </svg>
</button>

<style lang="scss">
  button {
    border: none;
    background: var(--color-light);
  }

  button svg {
    display: block;
    width: 1rem;
    color: var(--color-dark);
    text-align: right;
    transition: all var(--t);

    rect {
      transition: all var(--t);
    }
  }
</style>
