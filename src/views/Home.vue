<template>
  <div>
    <vs-card>
      <div class="flex items-center">
        <h3 class="m-0 flex-grow p-0">Welcome to ISV Admin Panel</h3>
        <vs-button
          icon="refresh"
          @click="refreshData">Reload</vs-button>
      </div>
    </vs-card>
    <div class="flex">
      <div class="w-1/2 pr-2">
        <vs-card>
          <div slot="header">
            <h2>User Quick Stats</h2>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <span>New Users</span>
              <h1>{{ recentUsers.length }}</h1>
              <span>In 30 days</span>
            </div>
            <div class="flex flex-col">
              <span>Total Users</span>
              <h1>{{ users.length }}</h1>
            </div>
            <div class="flex flex-col">
              <span>Pro Users</span>
              <h1>{{ proUsers.length }}</h1>
            </div>
          </div>
        </vs-card>
      </div>
      <div class="w-1/2 pr-2">
        <vs-card>
          <div slot="header">
            <h2>Recently Registered Users</h2>
          </div>
          <div class="">

            <div
              v-for="tr in recentUsers"
              :key="tr._id"
              class="flex justify-between">
              <div class="border px-4 py-2">{{ get(tr, "profile.name") }} <br> {{ tr.createdAt | formatDate }}</div>
              <div class="border px-4 py-2">
                <vs-button
                  icon="info"
                  @click="$router.push(`/users/edit/${tr._id}`)">
                </vs-button>
              </div>
            </div>
            <div v-if="recentUsers.length <= 0">
              <p>No <span class="font-bold text-danger">Recent Users</span> found who registered in previous 30 days</p>
            </div>

          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
p,ul{
  padding-bottom: 10px;
}
.logos img {
  max-height: 80px;
  margin-right: 40px;
}
</style>

<script>
import axios from "axios"
import {get} from "lodash"
import moment from "moment"
export default {
  data () {
    return {
      users: [],
      proposals: [],
      services: []
    }
  },
  computed: {
    lastFewUsers () {
      return this.recentUsers.slice(-2)
    },
    proUsers () {
      return this.users.filter((user) => user.type == "paidUser")
    },
    recentUsers () {
      return this.users.filter((user) => moment(user.createdAt).isAfter(moment().subtract(30, "days")))
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    get,
    refreshData () {
      this.$vs.loading({text: "Loading Data..."})
      Promise.all([
        this.loadUsers(),
        this.loadServices(),
        this.loadProposals()
      ]).finally(() => {
        this.$vs.loading.close()
      })
        .catch((e) => {
          this.$vs.notify({
            text: `Unable to fetch data from server. Refresh the page. Reason: ${e.response.data || e.message}`,
            color: "danger"
          })
        })
    },
    async loadUsers () {
      const {data} = await axios.get("/users")
      this.users = data
    },
    async loadServices () {
      const {data} = await axios.get("/services")
      this.services = data
    },
    async loadProposals () {
      const {data} = await axios.get("/proposals")
      this.proposals = data
    }
  }
}
</script>
