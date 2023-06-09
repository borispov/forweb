<script>
  import { fade } from "svelte/transition";
  $: point = {
    x: 50,
    y: 50,
  };

  export let isMenuOpen;

  $: console.log(isMenuOpen);

  const speed = 4;

  let menuItems = [
    { href: "/", label: "בית" },
    { href: "/#projects", label: "עבודות" },
    { href: "/about", label: "אודות" },
    { href: "/#services", label: "שירותים" },
    { href: "/#tech", label: "טכני" },
    { href: "/#contact-form", label: "יצירת קשר" },
    { href: "/blog", label: "בלוג" },
  ];

  let outlineHover = (e, i) => {};
</script>

<svelte:window
  on:mousemove={(e) => {
    point = {
      x: e.clientX,
      y: e.clientY,
    };
  }}
/>

{#if isMenuOpen}
  <div class="h" style="--x: {point.x}px; --y: {point.y}px;" />
  <div class="inner-h" style="--x: {point.x}px; --y: {point.y}px;" />
  <div class="wrapper header-menu" transition:fade>
    <div
      class="grid"
      role="menu"
      data-open={isMenuOpen}
      data-element="services"
    >
      {#each menuItems as { href, label }}
        <a class="text-step-4 link" {href} role="menuitem">
          <span class="link__text --default">
            {#each label as ch, i}
              <span
                style="--char-index: {i}; --opacity: 1; --delay: {i * 30}ms;"
                >{ch}</span
              >
            {/each}
          </span>
          <span class="link__text --outlined italic outline">
            {#each label as ch, i}
              <span
                data-char={ch}
                style="--char-index: {i}; --opacity: 0; --delay: {i *
                  2 *
                  20}ms;">{ch}</span
              >
            {/each}
          </span>
        </a>
      {/each}
    </div>
    <button
      aria-label="Close"
      class="close-btn"
      on:click={() => {
        isMenuOpen = false;
      }}
      ><svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M13.25 0.75L1.25 12.75" stroke="currentColor" /><path
          d="M1.25 0.75L13.25 12.75"
          stroke="currentColor"
        /></svg
      >
    </button>

    <div class="logo free-form">
      <h3 class="logo__type">FOR<span>WEB</span></h3>
      <div class="logo__shapes">
        <span data-shape="cube" />
        <span data-shape="circle" />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .free-form {
    position: fixed;
    bottom: 0.5em;
    left: var(--space-xl);
    border: 1px solid var(--color-mid);
  }

  * {
    cursor: none;
  }
  .h {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid black;
    transition: all 200ms ease-out;
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    transform: translate(calc(-50% + 15px), -50%);

    width: 4em;
    height: 4em;
    border: 2px solid orange;
    border-radius: 50%;
    z-index: 99999;
    transform: translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0);
  }

  .inner-h {
    z-index: 99999;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: var(--color-accent);
    opacity: 0.3;
    position: fixed;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: width 0.3s, height 0.3s, opacity 0.3s;
    left: var(--x);
    top: var(--y);
  }

  .header-menu {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    padding: var(--space-3xl) var(--space-xl);

    background: var(--color-dark);
    color: var(--color-light);
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1440px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
      --gutter: 0.5em;
    }
  }

  .link {
    position: relative;
    display: flex;
    white-space: nowrap;

    text-decoration: none;
    font-size: var(--step-6);

    transition: opacity 0.35s cubic-bezier(0.3, 0.86, 0.36, 0.95);
  }

  .--default {
    font-weight: 700;
    & span {
      transition-delay: var(--delay);
    }
  }

  .link:hover {
    .--outlined span {
      opacity: 1;
    }

    .--default span {
      color: var(--color-accent);
      opacity: 0;
    }
  }

  .--outlined {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    padding-right: 0.0625em;
    transform: matrix(1, 0, 0.75, 1, 0, 0);

    & span {
      opacity: 0;
      transition-delay: var(--delay);
    }
  }

  .close-btn {
    position: fixed;
    top: 0.5em;
    right: var(--space-xl);
    border-radius: 100%;
    background: var(--color-primary);
    color: var(--color-dark);
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-mid);

    svg {
      width: 1rem;
    }
  }
</style>
