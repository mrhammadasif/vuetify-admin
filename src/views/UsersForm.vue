<template>
  <div>
    <h3 class="px-0 pb-4 m-0">Add {{ label }}</h3>

    <div class="flex flex-col">
      <div class="bg-white shadow p-4">
        <vs-input
          v-validate="'required'"
          v-model="user.profile.name"
          :danger="errors.has('name')"
          :success="get(fields, 'name.dirty') && !errors.has('name')"
          val-icon-danger="close"
          class="w-full"
          label="Name"
          name="name"
        />
        <p
          v-if="errors.has('name')"
          class="text-danger text-small">{{ errors.first('name') }}</p>
      </div>

      <div class="bg-white shadow mt-2 p-4">
        <vs-input
          v-validate="'required'"
          v-model="user.email"
          :danger="errors.has('email')"
          :success="get(fields, 'email.dirty') && !errors.has('email')"
          val-icon-danger="close"
          class="w-full"
          label="Email"
          name="email"
        />
        <p
          v-if="errors.has('email')"
          class="text-danger text-small">{{ errors.first('email') }}</p>
      </div>

      <div class="bg-white shadow mt-2 p-4">
        <vs-input
          v-validate="'required|min:8'"
          v-model="user.password"
          :danger="errors.has('password')"
          :success="get(fields, 'password.dirty') && !errors.has('password')"
          val-icon-danger="close"
          class="w-full"
          label="password"
          name="password"
        />
        <p
          v-if="errors.has('password')"
          class="text-danger text-small">{{ errors.first('password') }}</p>
      </div>

      <div class="bg-white shadow mt-2 p-4">
        <vs-input
          v-validate="'required'"
          v-model="user.profile.company"
          :danger="errors.has('company')"
          :success="get(fields, 'company.dirty') && !errors.has('company')"
          val-icon-danger="close"
          class="w-full"
          label="company"
          name="company"
        />
        <p
          v-if="errors.has('company')"
          class="text-danger text-small">{{ errors.first('company') }}</p>
      </div>

      <div class="bg-white shadow mt-2 p-4">
        <vs-input
          v-validate="'required'"
          v-model="user.profile.jobTitle"
          :danger="errors.has('jobTitle')"
          :success="get(fields, 'jobTitle.dirty') && !errors.has('jobTitle')"
          val-icon-danger="close"
          class="w-full"
          label="jobTitle"
          name="jobTitle"
        />
        <p
          v-if="errors.has('jobTitle')"
          class="text-danger text-small">{{ errors.first('jobTitle') }}</p>
      </div>

      <div class="bg-white shadow mt-2 p-4">
        <vs-input
          v-validate="'required'"
          v-model="user.profile.location"
          :danger="errors.has('location')"
          :success="get(fields, 'location.dirty') && !errors.has('location')"
          val-icon-danger="close"
          class="w-full"
          label="location"
          name="location"
        />
        <p
          v-if="errors.has('location')"
          class="text-danger text-small">{{ errors.first('location') }}</p>
      </div>
      <div class="bg-white shadow mt-2 p-4">
        <label for="">Is Favorite</label>
        <vs-switch v-model="user.isFav" />
      </div>
      <div class="bg-white shadow mt-2 p-4">
        <label for="">Is Favorite</label>
        <vs-select
          v-validate="'required'"
          :danger="errors.has('type')"
          v-model="user.type"
          class="w-full"
          name="type">
          <vs-select-item
            value="paidUser"
            text="Pro User" />
          <vs-select-item
            value="normalUser"
            text="Normal User" />

        </vs-select>
      </div>
      <div class="bg-white shadow mt-2 p-4">
        <vs-textarea
          v-validate="'required'"
          v-model="user.profile.bio"
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
      </div>

      <vs-button @click="doSubmit">Save User</vs-button>

    </div>

  </div>
</template>

<script>
import {forOwn, get} from "lodash"
import axios from "axios"

export default {
  data: () => ({
    label: "User",
    user: {
      email: "",
      password: "",
      type: "",
      profile: {
        name: "",
        company: "",
        jobTitle: "",
        location: ""
      }
    }
  }),
  mounted () {
    // this.getProviders()
  },
  methods: {
    get,
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
          this.$vs.loading()
          console.log(this.user)
          const {status, data} = await axios.post("/users", this.user)
          if (status >= 200 && status <= 202) {
            this.$vs.notify({
              title: "Data Inserted",
              text: "New Connection Inserted Successfully",
              color: "success"
            })
            // this.clearForm()
          }
          else {
            throw `unable to insert a user. Reason: ${data.msg || data || "Network error"}`
          }
        }
        catch (err) {
          this.$vs.notify({
            text: `Error while inserting a ${this.label}. Reason: ${err.response.data || err.message}`,
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
