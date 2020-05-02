<template>
  <v-navigation-drawer
    v-model="drawer"
    v-bind="$attrs"
    color="primary"
    :expand-on-hover="drawer && !full"
    :mini-variant="drawer && !full"
    app>
    <v-list
      dense
      nav
      class="py-0">
      <v-list-item
        two-line
        :class="!full && 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $config.APP_TITLE }}</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in $store.state.sidenavItems"
        :key="item.title"
        link
        :color="$route.path.includes(item.path) ? 'white': 'primary'"
        @click="item.path && $router.push(item.path)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
