<template>
  <div>

    <vs-card class="p-5">
      <div
        slot="header"
        class="flex items-center justify-between">
        <h3>Services</h3>
        <div class="flex justify-end">
          <vs-button
            icon="refresh"
            color="warning"
            type="filled"
            class="mr-2"
            @click.stop="reloadData()"
          >Refresh</vs-button>
          <!-- <vs-button
            id="connections-step1"
            icon="link"
            color="primary"
            type="filled"
            @click.stop="$router.push({name: 'app-connections-add'})"
          >Add Connection</vs-button> -->
        </div>
      </div>
      <div>
        <vs-table :data="connections">
          <template slot="thead">
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Contract Type
            </vs-th>
            <vs-th>
              Industry
            </vs-th>
            <vs-th>
              Service Type
            </vs-th>
            <vs-th>
              Created
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              v-for="tr in data"
              :key="tr._id" >

              <!-- <vs-td class="pl-8">
                <img
                  :src="basePath + tr.name"
                  height="32"
                  alt="">
              </vs-td> -->

              <vs-td :data="tr.name">
                <span v-html="tr.name"></span><br>
                <span class="text-small">{{ tr._id }}</span>
              </vs-td>

              <vs-td :data="tr.contractType">
                {{ startCase(tr.contractType) }}
              </vs-td>

              <vs-td :data="tr.scope.industry">
                {{ startCase(tr.scope.industry ) }}
              </vs-td>

              <vs-td :data="tr.scope.serviceType">
                {{ startCase(tr.scope.serviceType) }}
              </vs-td>

              <vs-td :data="tr.createdAt">
                <vx-tooltip :text="tr.createdAt | formatDate">
                  {{ tr.createdAt | elapsedTime }}
                </vx-tooltip>
              </vs-td>
              <vs-td>
                <vs-button
                  type="filled"
                  icon="delete"
                  color="danger"
                  @click="deleteService(tr._id)"/>
              </vs-td>
              <!-- <vs-td :data="tr.statusDisplayName">
                <app-status-badge :status="tr.statusDisplayName" />
              </vs-td> -->
            </vs-tr>
          </template>
        </vs-table>
      </div>
    <!-- <div slot="footer"></div> -->
    </vs-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import apiConfig from "@/../api_config.json"
import {startCase} from "lodash"

export default Vue.extend({
  data: () => {
    return {connections: []}
  },
  computed: {basePath: () => apiConfig.EXTERNAL_ASSETS_BASEURL},
  mounted () {
    this.reloadData()
  },
  methods: {
    startCase,
    deleteService (serviceId) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure",
        text: `You want to delete the service with Id: ${serviceId}`,
        accept: () => this.acceptConfirm(serviceId)
      })
    },
    async acceptConfirm (serviceId) {
      try {
        await axios.delete("/services/" + serviceId)
        this.$vs.notify({
          color: "danger",
          title: "Deleted",
          text: "The selected service was successfully deleted"
        })
        this.reloadData()
      }
      catch (e) {
        this.$vs.dialog({
          type: "alert",
          color: "danger",
          title: "Failed to delete",
          text: "Reason: " + (e.response.data || e.message)
        })
      }
    },
    async reloadData () {
      this.$vs.loading({text: "Loading Services ..."})
      const {data} = await axios.get("/services")
      this.connections = data
      this.$vs.loading.close()
    }
  }
})
</script>
