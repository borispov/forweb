<script>
  import Burger from "./Burger.svelte";
  import BigMenu from "./BigMenu.svelte";

  $: isMenuOpen = false;

  // TODO: store preferences in localStorage
  $: darkMode = false;

  let burgerHandler = () => {
    isMenuOpen = true;
  };

  $: hide = false;

  let togg = () => {
    darkMode = !darkMode;
    window.document.body.setAttribute("dark-mode", darkMode);
  };

  const windowScrollHandler = () => {
    if (window.scrollY > 110) {
      hide = true;
    } else {
      hide = false;
    }
  };
</script>

<svelte:window on:scroll={windowScrollHandler} on:load={windowScrollHandler} />
<header class="repel">
  <BigMenu bind:isMenuOpen />
  <div class="menu repel">
    <button aria-label="theme toggle" on:click={togg} class="theme-toggle">
      {#if darkMode}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21Z"
          /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><g fill="none"
            ><circle
              cx="12"
              cy="12"
              r="4"
              fill="currentColor"
              opacity=".16"
            /><circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            /><path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
            /></g
          ></svg
        >
      {/if}
    </button>
    <a data-type="cta" href="/#contact-form">יצירת קשר</a>
    <Burger handler={burgerHandler} />
  </div>

  <div class="small-menu cluster" class:hide>
    <div class="hover-underline">
      <a class="link-grab nav__link" href="/#services">
        <span class="link-content">
          <span class="link-inner-content">
            <span>
              שירותים
              <span aria-hidden="true">שירותים</span>
            </span>
          </span>
        </span>
      </a>
    </div>

    <div class="hover-underline">
      <a class="link-grab nav__link hover-underline" href="/#projects">
        <span class="link-content">
          <span class="link-inner-content">
            <span>
              עבודות
              <span aria-hidden="true">עבודות</span>
            </span>
          </span>
        </span>
      </a>
    </div>
  </div>

  <div class="logo" class:hide>
    <h3 class="logo__type">FOR<span>WEB</span></h3>
    <div class="logo__shapes">
      <span data-shape="cube" />
      <span data-shape="circle" />
    </div>
  </div>
</header>

<style lang="scss">
  @mixin link($timing: 0.9s cubic-bezier(0.19, 1, 0.22, 1)) {
    display: flex;
    flex: none;
    flex-direction: row;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
    order: 0;
    padding: 15px 20px;
    font-weight: inherit;
    font-size: var(--step-0);
    line-height: var(--lh140);
    letter-spacing: -0.02em;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    position: relative;
    overflow: hidden;
    transition: background 0.6s, color 0.6s;
    text-decoration: none;
    max-width: fit-content;

    &::after,
    &::before {
      display: none;
    }

    span.link-inner-content {
      display: block;
      overflow: hidden;
      text-decoration: none;
      pointer-events: none;
    }

    span.link-inner-content span {
      display: block;
      position: relative;
      transform-origin: left top;
      transition: transform $timing;
      pointer-events: none;
      text-decoration: none;
    }
  }

  /* split roll up transition out to enable better focus states */
  @mixin link-animation($timing: 0.9s cubic-bezier(0.19, 1, 0.22, 1)) {
    .link-inner-content span:after {
      content: attr(data-text);
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      transform-origin: left top;
      transition: transform 0.9s;
      width: 100%;
      height: 100%;
    }

    // Guram this is part we want to add for the accessibility
    // concerns. We also need to change the markup as well

    // Guram
    .link-inner-content > span > span[aria-hidden] {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      transform-origin: left top;
      transition: transform $timing;
      width: 100%;
      height: 100%;
    }
    // Guram

    &:focus,
    &:focus-visible,
    &:hover {
      text-decoration: none;

      // Guram this is part we want to add for the accessibility
      // concerns. We also need to change the markup as well

      // Guram
      .link-inner-content > span > span[aria-hidden] {
        transform: translateY(0%);
      }
      // Guram

      .link-inner-content span {
        transform: translateY(-100%);
      }
    }
  }

  .nav__link {
    @include link-animation($timing: 0.9s cubic-bezier(0.19, 1, 0.22, 1));
    @include link($timing: 0.9s cubic-bezier(0.19, 1, 0.22, 1));

    font-size: var(--step-0);
    color: var(--text-color);
  }

  .logo__type {
    display: inline-block;
    color: var(--color-accent-2);
  }

  .logo__type span {
    color: var(--color-accent);
  }

  .logo,
  .small-menu {
    z-index: 1;
    --t: 0.2s linear 0.05s, transform 0.05s linear;
    transition: var(--t);
  }

  .logo__shapes {
    position: relative;
    display: inline-block;
    width: 24px;
  }

  .logo__shapes span[data-shape="circle"] {
    bottom: 0;
    left: 0;
    margin-left: -10px;
    margin-top: -10px;
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    /* border-radius: 50px; */
    background: var(--color-accent);
    z-index: 1;
  }

  span[data-shape="cube"] {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    background: var(--color-accent-2);
    z-index: 0;
  }

  header {
    position: sticky;
    top: 0;
    padding-block: var(--space-xs);
    flex-direction: row-reverse;
    width: 100%;
    max-width: 100%;
    z-index: 1;
    margin-bottom: var(--space-2xl);
  }

  .menu {
    --gutter: 1em;
    --color-mid: #bababa;

    padding: var(--space-3xs) var(--space-2xs);
    background: var(--color-light);
    color: var(--color-dark);

    border-radius: var(--menu-border-radius);
    border: 1px solid #bababa;
  }

  a {
    text-decoration: none;
    padding-left: var(--space-m);
  }

  a[data-type="cta"] {
    background: var(--color-accent);
    border-radius: 50px;
    color: var(--color-light);
    padding: var(--space-3xs) 20px;
    border: 1px solid var(--color-mid);
    transition: background var(--t);

    &:hover {
      background: var(--color-dark);
    }
  }

  @media (max-width: 568px) {
    /** SHOW CTA BUTTON */

    a:not([data-type="cta"]) {
      display: none;
    }

    a {
      display: none;
    }
  }

  .hover-underline::before {
    --h-underline-space: 0.5rem;
  }

  .hover-underline > * {
    text-decoration: none !important;
  }

  .hide {
    opacity: 0;
  }

  .theme-toggle {
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xs);
    border: none;
  }

  [dark-mode="true"] {
    background: blue;
    h3 {
      color: var(--color-primary);
      background: white;
    }
  }
</style>
