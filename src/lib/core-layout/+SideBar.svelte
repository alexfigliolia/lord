<script>
  import Link from "./+Link.svelte";
  import Logo from "./+Logo.svelte";
</script>

<nav>
  <div>
    <div class="logo">
      <Logo />
    </div>
    <button class="add">ADD +</button>
    <div class="links">
      <Link label="Overview" href="/" color="#9b8cae">
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20H4V4"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 16.5L12 9l3 3 4.5-4.5"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
      <Link label="Properties" href="/properties" color="#9b8cae">
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#9b8cae"
          ><path
            d="M10 9.01l.01-.011M14 9.01l.01-.011M10 13.01l.01-.011M14 13.01l.01-.011M10 17.01l.01-.011M14 17.01l.01-.011M6 20.4V5.6a.6.6 0 01.6-.6H12V3.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6z"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
      <Link label="Banking" href="/banking" color="#9b8cae">
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#9b8cae"
        >
          <path
            d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z"
            stroke="#9b8cae"
            stroke-width="1.5"
          /><path
            d="M15 8.5c-.685-.685-1.891-1.161-3-1.191M9 15c.644.86 1.843 1.35 3 1.391m0-9.082c-1.32-.036-2.5.561-2.5 2.191 0 3 5.5 1.5 5.5 4.5 0 1.711-1.464 2.446-3 2.391m0-9.082V5.5m0 10.891V18.5"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
      <Link label="Account" href="/account" color="#9b8cae">
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#9b8cae"
          ><path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          /><path
            d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
            stroke="#9b8cae"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >
      </Link>
    </div>
  </div>
</nav>

<style lang="scss">
  @use "$lib/variables.scss";
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 200px;
    background-color: #fff;
    text-align: center;
    box-shadow: 2.5px 0px 10px rgba(#000, 0.1);
    display: none;
    @media #{variables.$mq-1200} {
      display: block;
    }
    & > div {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      & > .logo {
        margin-top: 20%;
      }
      & > .add {
        cursor: pointer;
        padding: 0;
        border: none;
        margin-top: 40px;
        margin-bottom: 10px;
        height: 100px;
        width: 100px;
        color: #fff;
        border-radius: 10px;
        @include variables.center;
        font-weight: 700;
        background-color: variables.$core;
        box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
      }
    }
  }
</style>
