<template>
  <div>
    <vs-dropdown
      vs-custom-content
      vs-trigger-click
      class="cursor-pointer">
      <vs-button
        color="dark"
        type="flat"
        class="px-3">
        <vs-icon
          style="font-size: 24px;"
          icon="help" />
      </vs-button>
      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 15rem">
          <li
            class=" cursor-pointer hover:bg-primary">
            <a
              target="_blank"
              class="py-2 px-4 block hover:text-white"
              href="/docs">
              <feather-icon
                icon="BookIcon"
                svg-classes="w-4 h-4" />
              <span class="ml-2">
                Documentation
              </span>
            </a>
          </li>

          <li
            class="cursor-pointer hover:bg-primary">
            <a
              target="_blank"
              class="py-2 px-4 block hover:text-white"
              href="/tour">
              <feather-icon
                icon="MapIcon"
                svg-classes="w-4 h-4" />
              <span class="ml-2">
                Launch a guided Tour
              </span>
            </a>
          </li>
          <li
            class="cursor-pointer hover:bg-primary ">
            <a
              target="_blank"
              class="py-2 px-4 block hover:text-white"
              href="/status">
              <feather-icon
                icon="ActivityIcon"
                svg-classes="w-4 h-4" />
              <span class="ml-2">
                System Status
              </span>
            </a>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>
