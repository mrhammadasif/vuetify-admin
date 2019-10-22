
<template>
  <div
    id="page-login"
    class="h-screen flex w-full vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/4 sm:m-0 m-4">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <!-- <h4 class="mb-4">Login</h4> -->
                  <p>Welcome back, please login to your account.</p>
                </div>
                <vs-input
                  v-validate="'required|email|min:3'"
                  v-model="email"
                  data-vv-validate-on="blur"
                  name="email"
                  label-placeholder="Email"
                  class="w-full no-icon-border"/>
                <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                <vs-input
                  v-validate="'required|min:6|max:10'"
                  v-model="password"
                  data-vv-validate-on="blur"
                  type="password"
                  name="password"

                  label-placeholder="Password"
                  class="w-full mt-6 no-icon-border" />
                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                <!-- <div class="flex flex-wrap justify-between my-5">
                  <vs-checkbox
                    v-model="checkbox_remember_me"
                    class="mb-3">Remember Me</vs-checkbox>
                  <router-link to="/pages/forgot-password">Forgot Password?</router-link>
                </div> -->
                <div class="my-5 pb-5">
                  <!-- <vs-button
                  type="border"
                  @click="registerUser">Register</vs-button> -->
                  <vs-button
                    :disabled="!validateForm"
                    class="float-right"
                    @click="login">Login</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      email: "admin@nitroxis.com",
      password: "12345678"
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email != "" && this.password != ""
    }
  },
  methods: {
    login () {
      // const payload = {
      //   checkbox_remember_me: this.checkbox_remember_me,
      //   userDetails: ,
      //   notify: this.$vs.notify
      // }
      // this.$store.dispatch("auth/loginAttempt", payload)
      this.$vs.loading()
      axios.post("/login", {
        email: this.email,
        password: this.password
      })
        .then((resp) => {
          console.log(resp.data)
          this.$vs.notify({
            title: "Login Successful",
            text: resp.data.token,
            color: "success"
          })
          this.$store.dispatch("loginUser", {token: resp.data.token})
          this.$vs.loading.close()
          this.$router.replace("/")
        })
        .catch((err) => {
          console.error(err)
          this.$vs.loading.close()
          this.$vs.notify({
            title: "Login Error",
            text: err.response.data.msg || "Network Error. Try again",
            color: "danger"
          })
        })
    },

    notifyAlreadyLogedIn () {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      })
    },
    registerUser () {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.notifyAlreadyLogedIn()
        return false
      }
      this.$router.push("/pages/register")
    }
  }
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #4285F4;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
</style>
