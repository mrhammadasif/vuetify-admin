<template>
  <v-container grid-list-xs>
    <v-btn-toggle mandatory multiple v-model="value">
      <v-btn flat>
        <v-icon>mdi-alert-octagon</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon>mdi-alert</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon>mdi-account-heart</v-icon>
      </v-btn>
      <v-btn flat color="accent">
        <v-icon>mdi-rss</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-spacer></v-spacer>
    <v-divider class="my-2"></v-divider>
    <v-btn flat color="primary">
      <v-icon>mdi-ruler</v-icon>text
    </v-btn>
    <v-text-field
      name="name"
      label="label"
      color="accent"
      :rules="[$rules.isEmail(), $rules.isAlpha()]"
      id="id"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>