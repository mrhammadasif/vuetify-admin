<template>
  <!-- v-bind="$attrs" -->
  <!-- v-model="drawer" -->
  <v-navigation-drawer
    :color="$vuetify.theme.dark ? 'primary' : 'white'"
    :expand-on-hover="!full"
    :mini-variant="!full"
    app>
    <v-list
      dense
      nav
      :dark="$vuetify.theme.dark"
      class="py-0">
      <v-list-item
        two-line
        :class="!full && 'px-0'">
        <v-list-item-avatar v-if="$config.LOGO">
          <img
            :src="$config.LOGO"
            alt="">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $config.APP_NAME }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ $config.SUB_TITLE }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-btn
          icon
          @click.stop="$emit('navBtnClick')">
          <v-icon v-if="full">
            mdi-chevron-left
          </v-icon>
          <v-icon v-else>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <template
        v-for="item in $store.state.sidenavItems">
        <template v-if="full && item.type == 'heading'">
          <v-divider :key="item.title + '-divider'" />
          <v-subheader
            :key="item.title + '-subheader'"
            inset>
            {{ item.title }}
          </v-subheader>
        </template>
        <v-divider
          v-else-if="!full && item.type == 'heading'"
          :key="item.title">
          {{ item.title }}
        </v-divider>
        <v-list-item
          v-else
          :key="item.title"
          :exact="true"
          exact-active-class="primary"
          :to="item.path">
          <!-- :class="$route.path.includes(item.path) ? 'dark': 'light'" -->
          <v-list-item-icon>
            <v-icon :color="$route.path.includes(item.path) ? 'white' : ''">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="$route.path.includes(item.path) ? 'white--text font-weight-bold': 'light--text'">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          :class="{'px-0': full}"
          color="white"
          light
          text
          block
          @click="$emit('logout')">
          <v-icon>mdi-logout</v-icon>
          <span v-if="!full">Logout</span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>
