<script lang="ts">
  export let name: string = "**** ****";
  export let color: string = "purple";
</script>

<div class="creditcard">
  <div class="front">
    <div id="ccsingle" />
    <svg
      version="1.1"
      id="cardfront"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 750 471"
      style="enable-background:new 0 0 750 471;"
      xml:space="preserve"
    >
      <g id="Front">
        <g id="CardBackground">
          <g id="Page-1_1_">
            <g id="amex_1_">
              <path
                id="Rectangle-1_1_"
                class="lightcolor {color}"
                d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
											C0,17.9,17.9,0,40,0z"
              />
            </g>
          </g>
          <path
            class="darkcolor {color}dark"
            d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
          />
        </g>
        <text transform="matrix(1 0 0 1 60.106 295.0121)" id="svgnumber" class="st2 st3 st4"
          >**** **** **** ****</text
        >
        <text transform="matrix(1 0 0 1 54.1064 428.1723)" id="svgname" class="st2 st5 st6"
          >{name}</text
        >
        <text transform="matrix(1 0 0 1 54.1074 389.8793)" class="st7 st5 st8">cardholder name</text
        >
        <text transform="matrix(1 0 0 1 479.7754 388.8793)" class="st7 st5 st8">expiration</text>
        <text transform="matrix(1 0 0 1 65.1054 241.5)" class="st7 st5 st8">card number</text>
        <g>
          <text transform="matrix(1 0 0 1 574.4219 433.8095)" id="svgexpire" class="st2 st5 st9"
            >**/**</text
          >
          <text transform="matrix(1 0 0 1 479.3848 417.0097)" class="st2 st10 st11">VALID</text>
          <text transform="matrix(1 0 0 1 479.3848 435.6762)" class="st2 st10 st11">THRU</text>
          <polygon class="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
        </g>
        <g id="cchip">
          <g>
            <path
              class="st2"
              d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
									c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
            />
          </g>
          <g>
            <g>
              <rect x="82" y="70" class="st12" width="1.5" height="60" />
            </g>
            <g>
              <rect x="167.4" y="70" class="st12" width="1.5" height="60" />
            </g>
            <g>
              <path
                class="st12"
                d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
											c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
											C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
											c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
											c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
              />
            </g>
            <g>
              <rect x="82.8" y="82.1" class="st12" width="25.8" height="1.5" />
            </g>
            <g>
              <rect x="82.8" y="117.9" class="st12" width="26.1" height="1.5" />
            </g>
            <g>
              <rect x="142.4" y="82.1" class="st12" width="25.8" height="1.5" />
            </g>
            <g>
              <rect x="142" y="117.9" class="st12" width="26.2" height="1.5" />
            </g>
          </g>
        </g>
      </g>
      <g id="Back" />
    </svg>
  </div>
  <div class="back">
    <svg
      version="1.1"
      id="cardback"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 750 471"
      style="enable-background:new 0 0 750 471;"
      xml:space="preserve"
    >
      <g id="Front">
        <line class="st0" x1="35.3" y1="10.4" x2="36.7" y2="11" />
      </g>
      <g id="Back">
        <g id="Page-1_2_">
          <g id="amex_2_">
            <path
              id="Rectangle-1_2_"
              class="darkcolor {color}dark"
              d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
									C0,17.9,17.9,0,40,0z"
            />
          </g>
        </g>
        <rect y="61.6" class="st2" width="750" height="78" />
        <g>
          <path
            class="st3"
            d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
							C707.1,246.4,704.4,249.1,701.1,249.1z"
          />
          <rect x="42.9" y="198.6" class="st4" width="664.1" height="10.5" />
          <rect x="42.9" y="224.5" class="st4" width="664.1" height="10.5" />
          <path
            class="st5"
            d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
          />
        </g>
        <text transform="matrix(1 0 0 1 621.999 227.2734)" id="svgsecurity" class="st6 st7"
          >985</text
        >
        <g class="st8">
          <text transform="matrix(1 0 0 1 518.083 280.0879)" class="st9 st6 st10"
            >security code</text
          >
        </g>
        <rect x="58.1" y="378.6" class="st11" width="375.5" height="13.5" />
        <rect x="58.1" y="405.6" class="st11" width="421.7" height="13.5" />
        <text transform="matrix(1 0 0 1 59.5073 228.6099)" id="svgnameback" class="st12 st13"
          >John Doe</text
        >
      </g>
    </svg>
  </div>
</div>

<style lang="scss">
  #ccsingle {
    position: absolute;
    right: 15px;
    top: 20px;
  }

  .creditcard svg#cardfront,
  .creditcard svg#cardback {
    width: 100%;
    box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
    border-radius: 22px;
  }

  /* CHANGEABLE CARD ELEMENTS */
  .creditcard .lightcolor,
  .creditcard .darkcolor {
    -webkit-transition: fill 0.5s;
    transition: fill 0.5s;
  }

  .creditcard .lightblue {
    fill: #03a9f4;
  }

  .creditcard .lightbluedark {
    fill: #0288d1;
  }

  .creditcard .maroon {
    fill: #c13734;
  }

  .creditcard .maroondark {
    fill: #9e2d2b;
  }

  .creditcard .red {
    fill: #ef5350;
  }

  .creditcard .reddark {
    fill: #d32f2f;
  }

  .creditcard .purple {
    fill: #9e91fc;
  }

  .creditcard .purpledark {
    fill: #8f84e6;
  }

  .creditcard .cyan {
    fill: #26c6da;
  }

  .creditcard .cyandark {
    fill: #0097a7;
  }

  .creditcard .green {
    fill: #66bb6a;
  }

  .creditcard .greendark {
    fill: #388e3c;
  }

  .creditcard .lime {
    fill: #d4e157;
  }

  .creditcard .limedark {
    fill: #afb42b;
  }

  .creditcard .yellow {
    fill: #ffeb3b;
  }

  .creditcard .yellowdark {
    fill: #f9a825;
  }

  .creditcard .orange {
    fill: #ff9800;
  }

  .creditcard .orangedark {
    fill: #ef6c00;
  }

  .creditcard .grey {
    fill: #bdbdbd;
  }

  .creditcard .greydark {
    fill: #616161;
  }

  /* FRONT OF CARD */
  #svgname {
    text-transform: uppercase;
  }

  #cardfront .st2 {
    fill: #ffffff;
  }

  #cardfront .st3 {
    font-family: "Source Code Pro", monospace;
    font-weight: 600;
  }

  #cardfront .st4 {
    font-size: 54.7817px;
  }

  #cardfront .st5 {
    font-family: "Source Code Pro", monospace;
    font-weight: 400;
  }

  #cardfront .st6 {
    font-size: 33.1112px;
  }

  #cardfront .st7 {
    opacity: 0.6;
    fill: #ffffff;
  }

  #cardfront .st8 {
    font-size: 24px;
  }

  #cardfront .st9 {
    font-size: 36.5498px;
  }

  #cardfront .st10 {
    font-family: "Source Code Pro", monospace;
    font-weight: 300;
  }

  #cardfront .st11 {
    font-size: 16.1716px;
  }

  #cardfront .st12 {
    fill: #4c4c4c;
  }

  /* BACK OF CARD */
  #cardback .st0 {
    fill: none;
    stroke: #0f0f0f;
    stroke-miterlimit: 10;
  }

  #cardback .st2 {
    fill: #111111;
  }

  #cardback .st3 {
    fill: #f2f2f2;
  }

  #cardback .st4 {
    fill: #d8d2db;
  }

  #cardback .st5 {
    fill: #c4c4c4;
  }

  #cardback .st6 {
    font-family: "Source Code Pro", monospace;
    font-weight: 400;
  }

  #cardback .st7 {
    font-size: 27px;
  }

  #cardback .st8 {
    opacity: 0.6;
  }

  #cardback .st9 {
    fill: #ffffff;
  }

  #cardback .st10 {
    font-size: 24px;
  }

  #cardback .st11 {
    fill: #eaeaea;
  }

  #cardback .st12 {
    font-family: "Rock Salt", cursive;
  }

  #cardback .st13 {
    font-size: 37.769px;
  }

  .creditcard {
    width: 100%;
    max-width: 400px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: -webkit-transform 0.6s;
    -webkit-transition: -webkit-transform 0.6s;
    transition: transform 0.6s;
    transition: transform 0.6s, -webkit-transform 0.6s;
    cursor: pointer;
  }

  .creditcard .front,
  .creditcard .back {
    position: absolute;
    width: 100%;
    max-width: 400px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    color: #47525d;
  }

  .creditcard .front {
    position: static;
  }

  .creditcard .back {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
</style>
