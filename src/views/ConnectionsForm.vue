<template>
  <div>
    <div
      class="flex items-center justify-start"
      padding>
      <vs-button
        icon="arrow_back"
        @click="$router.replace({name: 'app-connections'})">Back</vs-button>
      <h3>Add Connection</h3>
    </div>
    <h5>Select Connection Type:</h5>
    <div
      class="flex no-outer "
      margin>

      <div
        v-for="cs in connectionSources"
        :class="{'selected': cs.providerIdAlt == connectionSource}"
        :key="cs.iproviderIdAltd"
        class="w-full flex connection-source"
        @click.prevent="connectionSource = cs.providerIdAlt"
      >
        <vs-card class="w-100">
          <img
            :src="cs.iconUrl"
            class="object-contain h-24" />
          <h4 v-html="cs.name"></h4>
        </vs-card>

      </div>
    </div>
    <!-- v-show="connectionSource != 0" -->
    <form
      v-show="connectionSource"
      action="#">
      <h5 class="pt-3 pb-4">Enter Connection Details:</h5>
      <vs-card
        id="loading-area"
        class="p-5">
        <vx-input-group>
          <template slot="prepend">
            <div
              class="prepend-text bg-secondary text-primary border-solid border-primary"
            >
              <span>Name for this Connection</span>
            </div>
          </template>

          <vs-input
            v-validate="'required'"
            v-model="connection.connectionName"
            data-vv-as="Connection Name"
            name="connectionName" />
        </vx-input-group>
        <span
          v-if="errors.has('connectionName')"
          class="text-danger">{{ errors.first('connectionName') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Resource URL</span>
            </div>
          </template>

          <vs-input
            v-validate="{required: true, url: {require_protocol: true}}"
            v-model="connection.apiResourcesUrl"
            data-vv-as="API Resource URL"
            name="apiResourcesUrl" />
        </vx-input-group>
        <span
          v-if="errors.has('apiResourcesUrl')"
          class="text-danger">{{ errors.first('apiResourcesUrl') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Authorization URL</span>
            </div>
          </template>

          <vs-input
            v-validate="{required: true, url: {require_protocol: true}}"
            v-model="connection.apiAuthorizationUrl"
            data-vv-as="API Authorization URL"
            name="apiAuthorizationUrl" />
        </vx-input-group>
        <span
          v-if="errors.has('apiAuthorizationUrl')"
          class="text-danger">{{ errors.first('apiAuthorizationUrl') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Metadata URL</span>
            </div>
          </template>

          <vs-input
            v-validate="{required: true, url: {require_protocol: true}}"
            v-model="connection.apiMetadataUrl"
            data-vv-as="API Metadata URL"
            name="apiMetadataUrl" />
        </vx-input-group>
        <span
          v-if="errors.has('apiMetadataUrl')"
          class="text-danger">{{ errors.first('apiMetadataUrl') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Optional Header</span>
            </div>
          </template>

          <vs-input
            v-model="connection.apiOptionalHeader"
            data-vv-as="API Optional Header"
            name="apiOptionalHeader" />
        </vx-input-group>
        <span
          v-if="errors.has('apiOptionalHeader')"
          class="text-danger">{{ errors.first('apiOptionalHeader') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Secret URL</span>
            </div>
          </template>

          <vs-input
            v-validate="{required: true, url: {require_protocol: true}}"
            v-model="connection.apiSecretUrl"
            data-vv-as="API Secret URL"
            name="apiSecretUrl" />
        </vx-input-group>
        <span
          v-if="errors.has('apiSecretUrl')"
          class="text-danger">{{ errors.first('apiSecretUrl') }}</span>

        <vx-input-group class="mt-6">
          <template slot="prepend">
            <div class="prepend-text bg-secondary text-primary border-solid border-primary">
              <span>API Key</span>
            </div>
          </template>

          <vs-input
            v-validate="'required'"
            v-model="connection.apiKey"
            data-vv-as="API Secret URL"
            name="apiKey" />
        </vx-input-group>
        <span
          v-if="errors.has('apiKey')"
          class="text-danger">{{ errors.first('apiKey') }}</span>

        <vs-row>
          <vs-col vs-w="6">
            <vx-input-group class="mt-6">
              <template slot="prepend">
                <div class="prepend-text bg-secondary text-primary border-solid border-primary">
                  <span>Version</span>
                </div>
              </template>

              <vs-input
                v-validate="'required'"
                v-model="connection.apiVersion"
                data-vv-as="API Secret URL"
                name="apiVersion"/>
            </vx-input-group>
            <span
              v-if="errors.has('apiVersion')"
              class="text-danger">{{ errors.first('apiVersion') }}</span>

          </vs-col>

          <vs-col
            vs-w="6"
            class="pl-2">

            <vx-input-group class="mt-6">
              <template slot="prepend">
                <div class="prepend-text bg-secondary text-primary border-solid border-primary">
                  <span>Year</span>
                </div>
              </template>

              <vs-input
                v-validate="'required'"
                v-model="connection.apiYear"
                data-vv-as="API Year"
                name="apiYear"/>
            </vx-input-group>
            <span
              v-if="errors.has('apiYear')"
              class="text-danger">{{ errors.first('apiYear') }}</span>
          </vs-col>
        </vs-row>

        <div
          class="w-100 flex justify-end mt-6">

          <vs-button
            class="mr-2"
            icon="save"
            color="warning"
            type="border"
            @click.prevent="dummyValues()"
          >Dummy Values</vs-button>
          <vs-button
            class="mr-2"
            icon="save"
            color="danger"
            type="border"
            @click.prevent="clearForm()"
          >Reset</vs-button>
          <vs-button
            icon="save"
            color="success"
            type="filled"
            @click.prevent="doSubmit()">Submit</vs-button>
        </div>
      </vs-card>
    </form>
  </div>
</template>

<script>
import {forOwn} from "lodash"
import axios from "axios"
import * as change from "chance"
const chance = change()

export default {
  data: () => ({
    connectionSource: 0,
    connectionSources: [],
    connection: {
      connectionName: "",
      apiResourcesUrl: "",
      apiAuthorizationUrl: "",
      apiMetadataUrl: "",
      apiOptionalHeader: "",
      apiKey: "",
      apiSecretUrl: "",
      apiVersion: "",
      apiYear: ""
    }
  }),
  mounted () {
    this.getProviders()
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
