<template>
  <div>
    <vs-button
      v-if="isDetailView"
      icon="keyboard_arrow_left"
      @click="$router.back()">
      Go Back
    </vs-button>

    <h3
      v-if="!isDetailView"
      class="px-0 pb-4 m-0">
      Add {{ label }}
    </h3>
    <h3
      v-else
      class="px-0 py-4 m-0">
      Viewing Details for "{{ service.name }}"
    </h3>

    <div
      v-if="errors.all().length > 0">
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
          v-model="data.firstName"
          v-validate="'required'"
          :danger="errors.has('firstName')"
          :success="get(fields, 'firstName.dirty') && !errors.has('firstName')"
          val-icon-danger="close"
          class="w-full"
          label="First Name"
          name="firstName" />
      </div>

      <div class="mt-2 p-4">
        <label for="">From User</label>
        <vs-select
          v-model="data.user"
          v-validate="'required'"
          :danger="errors.has('user')"
          class="w-full"
          name="user">
          <vs-select-item
            value=""
            text="Select" />
          <!-- <vs-select-item
            v-for="user in users"
            :key="user._id"
            :value="user._id"
            :text="user.profile.name" /> -->
        </vs-select>
      </div>
    </div>

    <vs-button
      v-if="!isDetailView"
      @click="doSubmit">
      Save {{ label }}
    </vs-button>
  </div>
</template>

<script>
import {startCase, get} from "lodash"
import axios from "axios"
import config from "@/config"

export default {
  data: () => ({
    label: "Data",
    isDetailView: false,
    data: {
      firstName: "",
      lastName: ""
    }
  }),
  mounted () {
    this.loadInitdata()
    this.isDetailView = this.$route.meta.isDetailView
  },
  methods: {
    get,
    startCase,

    loadInitdata (){
      // this.$vs.loading()
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
          const {status, data} = await axios.post("/data", {})
          if (status >= 200 && status <= 202) {
            this.$vs.notify({
              title: `${this.label} Inserted`,
              text: `New ${this.label} Inserted Successfully`,
              color: "success"
            })
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
