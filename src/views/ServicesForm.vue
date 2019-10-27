<template>
  <div>
    <vs-button
      v-if="isDetailView"
      icon="keyboard_arrow_left"
      @click="$router.back()">Go Back</vs-button>

    <h3
      v-if="!isDetailView"
      class="px-0 pb-4 m-0">Add {{ label }}</h3>
    <h3
      v-else
      class="px-0 py-4 m-0">Viewing Details for "{{ service.name }}"</h3>

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
          class="w-full"
          name="user">
          <vs-select-item
            value=""
            text="Select" />
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
        v-if="service.contractType == 'find-partner'"
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

    <div
      v-if="isDetailView"
      class="bg-white shadow my-2 p-4">
      <h3>Location</h3>
      {{ startCase(service.location.city) }}, {{ startCase(service.location.state) }}, {{ startCase(service.location.country) }}
    </div>
    <div
      v-else
      class="bg-white shadow my-2">
      <h3 class="p-4">Origin of the Service</h3>
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

    <div class="bg-white shadow my-2">
      <h3 class="p-4">Qualifying Factors</h3>
      <div class="p-4">
        <vs-input
          v-validate="'required'"
          v-model="service.scope.dos"
          :danger="errors.has('dos')"
          :success="get(fields, 'dos.dirty') && !errors.has('dos')"
          val-icon-danger="close"
          class="w-full"
          label="DO's"
          name="dos"
        />

      </div>
      <div class="p-4">
        <vs-input
          v-validate="'required'"
          v-model="service.scope.donts"
          :danger="errors.has('donts')"
          :success="get(fields, 'donts.dirty') && !errors.has('donts')"
          val-icon-danger="close"
          class="w-full"
          label="DONT's"
          name="donts"
        />

      </div>
      <div class="mt-2 p-4">
        <label for="">Target Market</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('targetMarket')"
          v-model="service.scope.targetMarket"
          class="w-full"
          name="targetMarket">
          <vs-select-item
            v-for="elem in [
              'sme',
              'enterprise',
              'government',
              'vertical'
            ]"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>
      <div class="mt-2 p-4">
        <label for="">Service Type</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('serviceType')"
          v-model="service.scope.serviceType"
          class="w-full"
          name="serviceType">
          <vs-select-item
            v-for="elem in [
              'product-sales',
              'service-sales',
              'consulting',
              'marketing'
            ]"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>

      <div class="mt-2 p-4">
        <label for="">Go To Market</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('gotoMarket')"
          v-model="service.scope.gotoMarket"
          class="w-full"
          name="gotoMarket">
          <vs-select-item
            v-for="elem in [
              'direct-sale',
              'indirect-sale',
              'cosell',
              'b2b',
              'b2c',
              'c2c'
            ]"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>
      <div class="mt-2 p-4">
        <label for="">Industry</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('industry')"
          v-model="service.scope.industry"
          class="w-full"
          name="industry">
          <vs-select-item
            v-for="elem in [
              'cloud',
              'hybrid',
              'premise'
            ]"
            :key="elem"
            :value="elem"
            :text="startCase(elem)" />

        </vs-select>
      </div>

    </div>

    <div class="flex flex-col bg-white shadow mb-4">
      <div class="p-4">
        <vs-input
          v-model="service.oppurtunity"
          :danger="errors.has('oppurtunity')"
          :success="get(fields, 'oppurtunity.dirty') && !errors.has('oppurtunity')"
          val-icon-danger="close"
          class="w-full"
          label="Oppurtunity"
          name="oppurtunity"
        />

      </div>
      <div class="p-4">
        <vs-input

          v-model="service.minimalSkills"
          :danger="errors.has('minimalSkills')"
          :success="get(fields, 'minimalSkills.dirty') && !errors.has('minimalSkills')"
          val-icon-danger="close"
          class="w-full"
          label="Minimal Skills"
          name="minimalSkills"
        />

      </div>
      <div class="p-4">
        <vs-input
          v-model="service.technicalSkills"
          :danger="errors.has('technicalSkills')"
          :success="get(fields, 'technicalSkills.dirty') && !errors.has('technicalSkills')"
          :label="startCase('technicalSkills')"
          val-icon-danger="close"
          class="w-full"
          name="technicalSkills"
        />

      </div>
      <div class="p-4">
        <vs-input
          v-validate="'url'"
          v-model="service.video"
          :danger="errors.has('video')"
          :success="get(fields, 'video.dirty') && !errors.has('video')"
          val-icon-danger="close"
          class="w-full"
          label="Youtube Video Link"
          description-text="Youtube share and short URLs will automatically by converted into EMBED Urls"
          name="video"
          @paste="convertToEmbed"
        />

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

    <div
      class="bg-white shadow">
      <div class="mt-2 p-4 mb-2">
        <label for="">Is Favorite</label>
        <vs-switch v-model="service.isFav" />
      </div>
    </div>
    <vs-button
      v-if="!isDetailView"
      @click="doSubmit">Save {{ label }}</vs-button>

  </div>
</template>

<script>
import {startCase, get} from "lodash"
import axios from "axios"
import config from "@/../api_config"

export default {
  data: () => ({
    label: "Service",
    isDetailView: false,
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
  updated (){
    if (this.$route.meta.isDetailView) {
      this.isDetailView = true
    }
    else {
      this.isDetailView = false
    }
  },
  mounted () {
    this.loadInitdata()
    if (this.$route.meta.isDetailView) {
      this.isDetailView = true
      this.loadService()
    }
  },
  methods: {
    get,
    startCase,
    async convertToEmbed ($e){
      await this.$sleep(100)
      const text = $e.target.value
      if (text) {

        const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g
        const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g

        let resultHtml = text

        // get all the matches for youtube links using the first regex
        const match = text.match(fullreg)
        if (match && match.length > 0) {
          // get all links and put in placeholders
          const matchlinks = text.match(linkreg)
          if (matchlinks && matchlinks.length > 0) {
            for (let i = 0; i < matchlinks.length; i++) {
              resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#")
            }
          }

          // now go through the matches one by one
          for (let i = 0; i < match.length; i++) {
            // get the key out of the match using the second regex
            const matchParts = match[i].split(regex)
            // replace the full match with the embedded youtube code
            resultHtml = resultHtml.replace(match[i], matchParts[1])
          }

          // ok now put our links back where the placeholders were.
          if (matchlinks && matchlinks.length > 0) {
            for (let i = 0; i < matchlinks.length; i++) {
              resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i])
            }
          }
        }
        this.service.video = `https://www.youtube.com/embed/${resultHtml}`
      }
    },
    async loadService (){
      this.$vs.loading()
      const {data} = await axios.get(`/services/${this.$route.params.serviceId}`)
      console.log(data)
      // this.$set(this.service, {
      //   ...this.service,
      //   ...data
      // })
      this.service = {
        ...this.service,
        ...data,
        user: data.user._id,
        contractType: data.contractType
      }
      this.$vs.loading.close()
    },
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
        try {
          this.$vs.loading()
          if (this.service.contractType == "sell-service"){
            this.service.contract.engagementType = undefined
          }
          const {status, data} = await axios.post("/services", this.service)
          if (status >= 200 && status <= 202) {
            this.$vs.notify({
              title: `${this.label} Inserted`,
              text: `New ${this.label} Inserted Successfully`,
              color: "success"
            })
            // this.clearForm()
          }
          else {
            throw `unable to insert a ${this.label}. Reason: ${data.msg || data || "Network error"}`
          }
        }
        catch (err) {
          this.$vs.notify({
            text: `Error while inserting a ${this.label}. Reason: ${JSON.stringify(err.response.data) || err.message}`,
            color: "danger"
          })
        }
        finally {
          this.$vs.loading.close()
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
