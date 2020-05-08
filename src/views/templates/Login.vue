<template>
  <v-row
    align="center"
    justify="center">
    <v-col
      cols="12"
      sm="8"
      md="4">
      <div class="text-center">
        <h2>{{ $config.APP_NAME }}</h2>
        <p>Login to continue</p>
      </div>
      <v-card class="elevation-12">
        <v-toolbar
          color="secondary"
          dark
          flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-email"

              type="text" />

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              append-icon="mdi-eye"
              :type="showPass ? 'password' : 'text'"
              @click:append="showPass = !showPass" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="$router.push('/applications')">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: function () {
    return {
      showPass: false
    }
  }
}
</script>
