<template>
  <v-row>
    <vs-col vs-w="4">
      <div class="flex flex-col">
        <vs-button
          v-for="item in [{name: '123'}, {name: '235'}]"
          :key="item"
          class="m-10 my-2"
          @click="activeItem = item">
          Press My Boob {{ item.name }}
        </vs-button>
        <vs-button
          color="danger"
          class="m-10 my-2"
          @click="activeItem = null">
          Leave My Boobs
        </vs-button>
      </div>
    </vs-col>
    <vs-col
      v-if="activeItem != null"
      vs-w="8">
      <h1>Detail Page for Boob {{ activeItem.name }}</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam accusamus explicabo provident harum nam fugit sunt non! Excepturi praesentium voluptatum corporis officiis maiores. Similique, eligendi consequatur debitis mollitia quaerat quo.</p>
    </vs-col>
  </v-row>
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
      activeItem: null,
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
