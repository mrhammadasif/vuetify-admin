<template>
  <div>
    <div
      class="flex items-center justify-start"
      padding>
      <h3>Add {{ label }}</h3>
    </div>

    <vs-card>
      <vs-input
        v-model="user.profile.name"
        label="Name"
        placeholder="Placeholder"/>
    </vs-card>

  </div>
</template>

<script>
import {forOwn} from "lodash"
import axios from "axios"
import * as change from "chance"
const chance = change()

export default {
  data: () => ({
    label: "User",
    user: {
      email: "",
      profile: {
        name: "",
        profilePicture: ""
      }
    }
  }),
  mounted () {
    // this.getProviders()
  },
  methods: {
    dummyValues () {
      const randomDomain = chance.domain({tld: "ie"})
      this.connection =  {
        connectionName: chance.name(),

        apiResourcesUrl: chance.url({
          domain_prefix: "api",
          domain: randomDomain
        }),
        apiAuthorizationUrl: chance.url({
          domain_prefix: "auth",
          domain: randomDomain
        }),
        apiMetadataUrl: chance.url({
          domain_prefix: "meta",
          domain: randomDomain
        }),
        apiOptionalHeader: "",
        apiKey: chance.hash({length: 24}),
        apiSecretUrl: chance.url({
          domain_prefix: "secret",
          domain: randomDomain
        }),
        apiVersion: chance.floating({
          min: 0,
          max: 20,
          fixed: 1
        }),
        apiYear: chance.year()
      }
    },
    clearForm () {
      forOwn(this.connection, (v, k) => {
        this.connection[k] = ""
      })
      this.$validator.reset()

    },
    async getProviders () {
      this.$vs.loading()
      const {data} = await axios.get("/Providers")
      this.connectionSources = data
      this.$vs.loading.close()
    },
    async doSubmit () {
      const isValid = await this.$validator.validate()
      if (!isValid) {
        this.$vs.notify({
          title: "Invalid form",
          text: "Fix the fields and try again",
          color: "danger"
        })
      }
      else {
        // the form is ok, you can proceed
        try {
          this.$vs.loading({
            container: "#loading-area",
            color: "primary"
          })
          console.log(this.$store.state.TenantId)
          const {status} = await axios.post("/Connections", {
            tenantIdAlt: this.$store.state.currentTenant,
            providerIdAlt: this.providerIdAlt,
            ...this.connection
          })
          if (status >= 200 && status <= 202) {
            this.$vs.notify({
              title: "Data Inserted",
              text: "New Connection Inserted Successfully",
              color: "success"
            })
            this.clearForm()
          }
          this.$vs.loading.close("#loading-area > .con-vs-loading")
        }
        catch (err) {
          console.error(err)
          if (err.response) {console.error(err.response)}
          let errs = []
          if (typeof err.response.data.errors != "undefined") {
            errs = Object.values(err.response.data.errors)
          }

          this.$vs.notify({
            title: "Request Error",
            text: (
              err.response.data.title
              + "<br>"
              + errs
                .join("<br>")
            ) || "Request Failed. Try again",
            color: "danger"
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vuesax/_variables.scss";
.connection-source {
  .con-vs-card{
    cursor: pointer;
    border: 1px solid #ccc;
    box-shadow: none;
    margin-bottom: 0;
    text-align: center;
    transition: 0.5s background linear;
    img {
      width: 80%;
    }
    &:hover {
      box-shadow: 0 3px 2px -2px rgba(0,0,0,0.3);
    }
    h4 {
      text-align: center;
      font-weight: bold;
      color: $dark;
    }
  }
  &.selected .con-vs-card{
    box-shadow: 0 6px 4px -2px rgba(0,0,0,0.3);
    // background: #fff;
    background: linear-gradient(180deg, rgba(255,255,255,1) 93%, rgb(168, 255, 149) 100%);
    border-color: $success;
    * {
      color: $success;

    }
  }
}
.vx-input-group + span {
  // text-transform: uppercase;
  display: block;
  padding-left: 10px;
  padding-top: 5px;
  &::before {
    content: "☝ "
  }
}
</style>
