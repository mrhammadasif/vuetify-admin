<template>
  <div>
    <h3 class="px-0 pb-4 m-0">Add {{ label }}</h3>

    <div
      v-if="errors.all().length > 0"
    >
      <transition-group name="fade">
        <vs-alert
          v-for="error in errors.all()"
          :key="error"
          icon="warning"
          class="mb-2"
          color="danger">
          {{ error }}
        </vs-alert>
      </transition-group>
    </div>
    <div class="flex flex-col bg-white shadow mb-4">
      <div class="p-4">
        <vs-input
          v-validate="'required'"
          v-model="service.name"
          :danger="errors.has('name')"
          :success="get(fields, 'name.dirty') && !errors.has('name')"
          val-icon-danger="close"
          class="w-full"
          label="Name"
          name="name"
        />

      </div>

      <div class="mt-2 p-4">
        <label for="">From User</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('user')"
          v-model="service.user"
          autocomplete
          class="w-full"
          name="user">
          <vs-select-item
            v-for="user in users"
            :key="user._id"
            :value="user._id"
            :text="user.profile.name" />

        </vs-select>
      </div>
    </div>

    <div class="bg-white shadow my-2">
      <h3 class="p-4">Contract Details</h3>
      <div class="mt-2 p-4">
        <label for="">Select Contract Type</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('contractType')"
          v-model="service.contractType"
          class="w-full"
          name="contractType"
        >
          <vs-select-item
            value="sell-service"
            text="Sell a Service" />
          <vs-select-item
            value="find-partner"
            text="Find a Partner" />

        </vs-select>
      </div>

      <div
        v-if="service.contractType == 'sell-service'"
        class="mt-2 p-4">
        <label for="">Select Term for Contract</label>
        <vs-select
          v-validate="service.contractType == 'sell-service' ? 'required' : ''"
          :danger="errors.has('term')"
          v-model="service.contract.term"
          class="w-full"
          name="term">
          <vs-select-item
            v-for="elem in ['1 month','3 months','6 months','1 year','1+ years','POA']"
            :key="elem"
            :value="elem"
            :text="elem" />

        </vs-select>
      </div>

    </div>

    <div class="bg-white shadow my-2">
      <h3 class="p-4">Location</h3>
      <div class="mt-2 p-4">
        <label for="">Select Continent</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('user')"
          v-model="geo.continent"
          class="w-full"
          name="user"
        >
          <vs-select-item
            v-for="continent in continents"
            :key="continent"
            :value="continent"
            :text="startCase(continent)" />

        </vs-select>
      </div>

      <div
        v-if="geo.continent != ''"
        class="mt-2 p-4">
        <label for="">Select Country</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('country')"
          v-model="geo.country"
          class="w-full"
          name="country">
          <vs-select-item
            v-for="elem in countries"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>

      <div
        v-if="geo.country"
        class="mt-2 p-4">
        <label for="">Select State</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('state')"
          v-model="geo.state"
          class="w-full"
          name="state">
          <vs-select-item
            v-for="elem in states"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>

      <div
        v-if="geo.state != ''"
        class="mt-2 p-4">
        <label for="">Select City</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('location')"
          v-model="service.location"
          class="w-full"
          name="location">
          <vs-select-item
            v-for="elem in cities"
            :key="elem._id"
            :value="elem._id"
            :text="startCase(elem.city)" />

        </vs-select>
      </div>
    </div>

    <!-- <div class="mt-2 p-4">
        <vs-textarea
          v-validate="'required'"
          v-model="service.profile.bio"
          :danger="errors.has('bio')"
          :success="get(fields, 'bio.dirty') && !errors.has('bio')"
          val-icon-danger="close"
          class="w-full"
          label="bio"
          name="bio"
        />
        <p
          v-if="errors.has('bio')"
          class="text-danger text-small">{{ errors.first('bio') }}</p>
      </div> -->

    <div class="bg-white shadow">
      <div class="mt-2 p-4 mb-2">
        <label for="">Is Favorite</label>
        <vs-switch v-model="service.isFav" />
      </div>
    </div>
    <vs-button @click="doSubmit">Save {{ label }}</vs-button>

  </div>
</template>

<script>
import {startCase, get} from "lodash"
import axios from "axios"
import config from "@/../api_config"

export default {
  data: () => ({
    label: "Service",
    users: [],
    continents: [],
    countries: [],
    states: [],
    cities: [],
    geo: {
      continent: "",
      country: "",
      state: ""
    },
    service: {
      user: "",
      name: "",
      scope: {
        industry: "",
        serviceType: "",
        gotoMarket: "",
        targetMarket: "",
        dos: "",
        donts: ""
      },
      contractType: "sell-service", // find-partner,
      contract: {
        term: "",
        engagementType: ""
      },
      salesCycle: {
        need: "",
        targetBuyers: "",
        duration: "",
        deliverables: ""
      },
      oppurtunity: "",
      video: "",
      isFav: false,
      minimalSkills: "",
      technicalSkills: "",
      location: ""
    }
  }),
  watch: {
    "geo.continent" () {
      this.getCountries()
      this.geo.country = ""
      this.geo.state = ""
      this.service.location = ""
    },
    "geo.country" () {
      this.getStates()
      this.geo.state = ""
      this.service.location = ""
    },
    "geo.state" () {
      this.getCities()
      this.service.location = ""
    }
  },
  mounted () {
    this.loadInitdata()
  },
  methods: {
    get,
    startCase,
    loadInitdata (){
      this.$vs.loading()
      Promise.all([
        this.getUsers(),
        this.getContinents()
      ])
        .catch((err) => {
          this.$vs.notify({
            text: `Error while loading. Reason ${err.response.data || err.message}`,
            color: "danger"
          })
        })
        .finally(() => {
          this.$vs.loading.close()
        })
    },
    autoCompleteFunc (...a) {
      console.log(a)
    },
    async getUsers () {
      const {data} = await axios.get("/users")
      this.users = data
    },
    async getContinents () {
      this.$vs.loading()
      const {data} = await axios.get(`${config.GEOBASE}/continents`)
      this.continents = data
      this.$vs.loading.close()
    },
    async getCountries () {
      if (this.geo.continent == "") {return}
      this.$vs.loading()
      const {data} = await axios.get(`${config.GEOBASE}/countries/${this.geo.continent}`)
      this.countries = data
      this.$vs.loading.close()
    },
    async getStates () {
      if (this.geo.country == "") {return}
      this.$vs.loading()
      const {data} = await axios.get(`${config.GEOBASE}/states/${this.geo.country}`)
      this.states = data
      this.$vs.loading.close()
    },
    async getCities () {
      if (this.geo.country == "") {return}
      if (this.geo.state == "") {return}
      this.$vs.loading()
      const {data} = await axios.get(`${config.GEOBASE}/cities/${this.geo.country}/${this.geo.state}`)
      this.cities = data
      this.$vs.loading.close()
    },
    async doSubmit () {
      const isValid = await this.$validator.validate()
      if (!isValid) {
        this.$vs.notify({
          text: "Fix the highlighted errors and try again",
          color: "danger"
        })
        window.scrollTo(0, 0)
      }
      else {
        // the form is ok, you can proceed
        // try {
        //   this.$vs.loading()
        //   console.log(this.user)
        //   const {status, data} = await axios.post("/users", this.user)
        //   if (status >= 200 && status <= 202) {
        //     this.$vs.notify({
        //       title: "Data Inserted",
        //       text: "New Connection Inserted Successfully",
        //       color: "success"
        //     })
        //     // this.clearForm()
        //   }
        //   else {
        //     throw `unable to insert a user. Reason: ${data.msg || data || "Network error"}`
        //   }
        // }
        // catch (err) {
        //   this.$vs.notify({
        //     text: `Error while inserting a ${this.label}. Reason: ${err.response.data || err.message}`,
        //     color: "danger"
        //   })
        // }
        // finally {
        //   this.$vs.loading.close()
        // }
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
