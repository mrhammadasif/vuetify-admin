<template>
  <div>
    <vs-card>
      <div>
        <h3 class="m-0 p-0">Welcome to ISV Admin Panel</h3>
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
              <h1>31</h1>
              <span>In 30 days</span>
            </div>
            <div class="flex flex-col">
              <span>Total Users</span>
              <h1>200</h1>
            </div>
            <div class="flex flex-col">
              <span>Pro Users</span>
              <h1>23</h1>
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
              <div class="border px-4 py-2">{{ tr.profile.name }} <br> {{ tr.createdAt | formatDate }}</div>
              <div class="border px-4 py-2">
                <vs-button
                  color="primary"
                  type="filled"
                  @click="$router.push(`/users/edit/${tr._id}`)">
                  View Details
                </vs-button>
              </div>
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
export default {
  data () {
    return {
      users: [],
      proposals: [],
      services: []
    }
  },
  computed: {
    recentUsers () {
      return this.users.slice(-2)
    }
  },
  mounted () {
    this.$vs.loading({text: "Loading Data..."})
    Promise.all([
      this.loadUsers(),
      this.loadServices(),
      this.loadProposals()
    ]).then(() => {
      this.$vs.loading.close()
    })
      .catch((e) => {
        this.$vs.notify({
          text: `Unable to fetch data from server. Refresh the page. Reason: ${e.response.data || e.message}`,
          color: "danger"
        })
      })
  },
  methods: {
    async loadUsers () {
      const {data} = await axios.get("/users")
      this.users = data
    },
    async loadServices () {
      const {data} = await axios.get("/services")
      this.users = data
    },
    async loadProposals () {
      const {data} = await axios.get("/proposals")
      this.users = data
    }
  }
}
</script>
