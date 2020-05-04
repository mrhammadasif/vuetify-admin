<template>
  <v-container
    class="d-flex">
    <v-row>
      <v-col
        cols="12"
        sm="4">
        <v-card
          ripple
          class="pa-2">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Route Path
              </h3>
              <div>{{ $route.path }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4">
        <v-card
          ripple
          class="pa-2">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Application Name
              </h3>
              <div>{{ $config.APP_TITLE }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4">
        <v-card
          ripple
          class="pa-2">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Route Name
              </h3>
              <div>{{ $route.name }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
