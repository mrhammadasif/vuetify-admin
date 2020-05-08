<template>
  <v-card>
    <v-img
      :key="app.title + '-img'"
      height="150"
      src="https://picsum.photos/300/200">
    </v-img>
    <v-divider></v-divider>
    <v-menu
      v-model="dropdown"
      :close-on-content-click="false"
      attach
      bottom
      class="fill-height"
      left
      min-width="100%"
      offset-y
      transition="slide-y-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-hover v-model="hover">
          <div
            class="d-flex align-center justify-space-between fill-height">
            <p
              class="mb-0 pl-4">
              {{ app.title }}
            </p>
            <v-sheet
              :color="hover && 'primary'"
              class="d-flex align-center justify-center"
              width="64"
              tile
              height="64"
              v-on="on">
              <!-- v-on="on" -->
              <v-icon :color="hover && 'white'">
                mdi-cog
              </v-icon>
            </v-sheet>
          </div>
        </v-hover>
      </template>
      <v-list>
        <v-list-item @click="$toast.success('Installing...');dropdown = false">
          <v-list-item-title>Install</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Auto update</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-switch class="ml-auto justify-end" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  props: [
    "app"
  ],
  data: function () {
    return {
      dropdown: false,
      hover: false
    }
  }
}
</script>
