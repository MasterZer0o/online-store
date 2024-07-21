<template>
  <div class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-[1536px] mt-10">
    <div class="grid grid-cols xs:pb-4">
      <div class="ml-4 text-lg font-bold leading-7 font-body text-green">
        How to buy
      </div>

      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/payment-methods"
        >Payment methods</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/order"
        >Order pickup</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/purchase"
        >Purchase status</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/track"
        >Track orders</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/returns"
        >Returns</a></span>
      </li>
    </div>
    <div class="grid grid-cols xs:pb-4">
      <div class="ml-4 text-lg font-bold leading-7 font-body text-green">
        Help
      </div>

      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/help"
        >Help centers</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/security"
        >Security &amp; fraud</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/feedback"
        >Feedback</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/contact"
        >Contact</a></span>
      </li>
    </div>
    <div class="grid grid-cols xs:pb-4">
      <div class="ml-4 text-lg font-bold leading-7 font-body text-green">
        Services
      </div>

      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/gift"
        >Gift cards</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/order"
        >Order pickup</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/purchase"
        >Purchase status</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/track"
        >Track orders</a></span>
      </li>
    </div>
    <div class="grid grid-cols xs:pb-4">
      <div class="ml-4 text-lg font-bold leading-7 font-body text-green">
        About
      </div>

      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/about"
        >About us</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/order"
        >Order pickup</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/purchase"
        >Purchase status</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/track"
        >Track orders</a></span>
      </li>
      <li
        class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 py-2 !bg-transparent typography-text-sm font-body"
        data-testid="list-item"
      >
        <span class="flex flex-col w-full min-w-0"><a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/returns"
        >Returns</a></span>
      </li>
    </div>
  </div>
  <hr />
  <div class="py-10 md:flex md:mx-auto max-w-[1536px]">
    <div class="mx-auto my-4 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="inline-block fill-current w-8 h-8" viewBox="0 0 24 24" data-testid="help">
        <path
          d="M11.95 18c.35 0 .646-.121.888-.363.241-.241.362-.537.362-.887s-.12-.646-.362-.887a1.208 1.208 0 0 0-.888-.363c-.35 0-.646.121-.888.363a1.206 1.206 0 0 0-.362.887c0 .35.12.646.362.887.242.242.538.363.888.363Zm.15-10.3c.467 0 .842.129 1.125.387.283.259.425.596.425 1.013 0 .283-.096.57-.287.862a4.896 4.896 0 0 1-.813.913c-.5.433-.867.85-1.1 1.25-.233.4-.35.8-.35 1.2a.76.76 0 0 0 .263.587.904.904 0 0 0 1.237-.012c.183-.167.3-.375.35-.625.05-.283.163-.546.338-.787.175-.242.462-.555.862-.938.517-.483.88-.925 1.088-1.325.208-.4.312-.842.312-1.325 0-.85-.32-1.546-.962-2.088C13.946 6.271 13.117 6 12.1 6c-.7 0-1.32.133-1.862.4a2.844 2.844 0 0 0-1.263 1.225.99.99 0 0 0-.125.637c.033.209.15.38.35.513a.965.965 0 0 0 .713.125 1 1 0 0 0 .637-.425c.183-.25.404-.442.663-.575.258-.133.554-.2.887-.2ZM12 22a9.671 9.671 0 0 1-3.875-.788 10.238 10.238 0 0 1-3.187-2.137 9.983 9.983 0 0 1-2.15-3.175A9.733 9.733 0 0 1 2 12a9.74 9.74 0 0 1 .788-3.9 9.983 9.983 0 0 1 2.15-3.175c.908-.9 1.97-1.613 3.187-2.138A9.681 9.681 0 0 1 12 2c1.4 0 2.708.262 3.925.787A10.105 10.105 0 0 1 19.1 4.925c.9.9 1.608 1.958 2.125 3.175A9.873 9.873 0 0 1 22 12a9.873 9.873 0 0 1-.775 3.9 9.927 9.927 0 0 1-2.125 3.175c-.9.9-1.958 1.612-3.175 2.137C14.708 21.737 13.4 22 12 22Z"
        ></path>
      </svg>
      <p class="py-1 my-2 font-medium typography-text-lg font-body">
        <a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/help"
        >Help center</a>
      </p>

      <p class="leading-5 typography-text-sm font-body">
        Find answers online anytime
      </p>
    </div>
    <div class="mx-auto my-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block fill-current w-8 h-8"
        viewBox="0 0 24 24"
        data-testid="contact-support"
      >
        <path
          d="m13 22-.25-3h-.25c-2.367 0-4.375-.825-6.025-2.475C4.825 14.875 4 12.867 4 10.5c0-2.367.825-4.375 2.475-6.025C8.125 2.825 10.133 2 12.5 2c1.183 0 2.287.22 3.312.662a8.6 8.6 0 0 1 2.701 1.825 8.588 8.588 0 0 1 1.824 2.7A8.279 8.279 0 0 1 21 10.5c0 2.533-.758 4.804-2.275 6.812C17.208 19.321 15.3 20.883 13 22Zm-.525-6.025c.283 0 .525-.1.725-.3.2-.2.3-.442.3-.725s-.1-.525-.3-.725c-.2-.2-.442-.3-.725-.3s-.525.1-.725.3c-.2.2-.3.442-.3.725s.1.525.3.725c.2.2.442.3.725.3ZM12.5 12.8c.183 0 .35-.067.5-.2a.988.988 0 0 0 .3-.55c.033-.217.125-.413.275-.588.15-.175.408-.445.775-.812.3-.3.55-.625.75-.975.2-.35.3-.725.3-1.125 0-.85-.287-1.488-.862-1.913C13.963 6.212 13.283 6 12.5 6c-.583 0-1.087.133-1.512.4a3.41 3.41 0 0 0-1.038 1 .617.617 0 0 0-.063.575c.075.2.23.342.463.425a.65.65 0 0 0 .5 0c.167-.067.317-.192.45-.375a1.67 1.67 0 0 1 .488-.45c.191-.117.429-.175.712-.175.45 0 .788.125 1.013.375.225.25.337.525.337.825 0 .283-.083.537-.25.762a6.18 6.18 0 0 1-.6.688c-.467.4-.78.725-.938.975-.158.25-.254.592-.287 1.025-.017.2.046.375.188.525.141.15.32.225.537.225ZM15 17v1.35c1.183-1 2.146-2.17 2.887-3.512A8.822 8.822 0 0 0 19 10.5c0-1.817-.629-3.354-1.887-4.613C15.854 4.629 14.317 4 12.5 4c-1.817 0-3.354.629-4.612 1.887C6.629 7.146 6 8.683 6 10.5c0 1.817.63 3.354 1.888 4.613C9.146 16.371 10.683 17 12.5 17H15Z"
        ></path>
      </svg>
      <p class="py-1 my-2 font-medium typography-text-lg font-body">
        <a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/live"
        >Live chat</a>
      </p>

      <p class="leading-5 typography-text-sm font-body">
        Mon–Fri, 5am–10pm PT
      </p>
      <p class="leading-5 typography-text-sm font-body">
        Sat–Sun, 6am–9pm PT
      </p>
    </div>
    <div class="mx-auto my-4 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="inline-block fill-current w-8 h-8" viewBox="0 0 24 24" data-testid="call">
        <path
          d="M19.95 21c-2.15 0-4.246-.48-6.287-1.438a19.045 19.045 0 0 1-5.425-3.8 19.045 19.045 0 0 1-3.8-5.425C3.479 8.296 3 6.2 3 4.05c0-.3.1-.55.3-.75.2-.2.45-.3.75-.3H8.1a.96.96 0 0 1 .625.225.88.88 0 0 1 .325.575l.65 3.5c.033.233.03.446-.012.637a1.027 1.027 0 0 1-.288.513L6.975 10.9a16.4 16.4 0 0 0 2.638 3.375A18.626 18.626 0 0 0 13.1 17l2.35-2.35a1.4 1.4 0 0 1 .588-.338c.241-.075.479-.095.712-.062l3.45.7c.233.05.425.162.575.337.15.175.225.38.225.613v4.05c0 .3-.1.55-.3.75-.2.2-.45.3-.75.3ZM6.025 9l1.65-1.65L7.25 5H5.025c.083.683.2 1.358.35 2.025.15.667.367 1.325.65 1.975ZM19 18.95v-2.2l-2.35-.475-1.675 1.675c.65.283 1.313.508 1.988.675.675.167 1.354.275 2.037.325Z"
        ></path>
      </svg>
      <p class="py-1 my-2 font-medium typography-text-lg font-body">
        <a
          class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm no-underline hover:underline active:underline active:!text-neutral-900"
          data-testid="link"
          href="/tel"
        >1 234 567 8901</a>
      </p>

      <p class="leading-5 typography-text-sm font-body">
        Mon–Fri, 5am–10pm PT
      </p>
      <p class="leading-5 typography-text-sm font-body">
        Sat–Sun, 6am–9pm PT
      </p>
    </div>
  </div>
  <div class="bg-neutral-900 justify-end px-4 py-10 md:flex md:py-6 max-w-[1536px] mx-auto">
    <div class="flex items-center justify-center gap-6 py-2 my-4 md:ml-auto md:my-0">
      <a
        class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline hover:text-primary-800 active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm text-white no-underline typography-text-sm active:text-white active:underline hover:text-white hover:underline"
        data-testid="link"
        href="/terms"
      >Terms</a><a
        class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline hover:text-primary-800 active:text-primary-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm text-white no-underline typography-text-sm active:text-white active:underline hover:text-white hover:underline"
        data-testid="link"
        href="/privacy"
      >Privacy policy</a>
    </div>
    <p class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body md:ml-6">
      @2023 Vue Storefront
    </p>
  </div>
</template>
