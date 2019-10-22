<template>
  <div>

    <vs-card class="p-5">
      <div
        slot="header"
        class="flex items-center justify-between">
        <h3>Connections</h3>
        <div class="flex justify-end">
          <vs-button
            icon="refresh"
            color="warning"
            type="filled"
            class="mr-2"
            @click.stop="loadConnections()"
          >Refresh</vs-button>
          <vs-button
            id="connections-step1"
            icon="link"
            color="primary"
            type="filled"
            @click.stop="$router.push({name: 'app-connections-add'})"
          >Add Connection</vs-button>
        </div>
      </div>
      <div>
        <vs-table :data="connections">
          <template slot="thead">
            <vs-th>
              Connector Type
            </vs-th>
            <vs-th>
              Connection Name
            </vs-th>
            <vs-th>
              Client Key
            </vs-th>
            <vs-th>
              Version
            </vs-th>
            <vs-th>
              Year
            </vs-th>
            <vs-th>
              Created
            </vs-th>
            <vs-th>
              Status
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              v-for="(tr, indextr) in data"
              :key="indextr" >

              <vs-td class="pl-8">
                <img
                  :src="basePath + data[indextr].providerIconUrl"
                  height="32"
                  alt="">
              </vs-td>

              <vs-td :data="data[indextr].connectionName">
                {{ data[indextr].connectionName }}<br>
                <span class="text-small">{{ data[indextr].apiResourcesUrl }}</span>
              </vs-td>

              <vs-td :data="data[indextr].apiKey">
                {{ data[indextr].apiKey }}
              </vs-td>

              <vs-td :data="data[indextr].apiVersion">
                {{ data[indextr].apiVersion }}
              </vs-td>
              <vs-td :data="data[indextr].apiYear">
                {{ data[indextr].apiYear }}
              </vs-td>

              <vs-td :data="data[indextr].createdDate">
                <vx-tooltip :text="data[indextr].createdDate | formatDate">
                  {{ data[indextr].createdDate | elapsedTime }}
                </vx-tooltip>
              </vs-td>

              <vs-td :data="data[indextr].statusDisplayName">
                <app-status-badge :status="data[indextr].statusDisplayName" />
              </vs-td>
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

export default Vue.extend({
  data: () => {
    return {connections: []}
  },
  computed: {basePath: () => apiConfig.EXTERNAL_ASSETS_BASEURL},
  mounted () {
    // this.loadConnections()
  },
  methods: {
    async loadConnections () {
      this.$vs.loading({text: "Loading Services ..."})
      const {data} = await axios.get("/services")
      this.connections = data
      this.$vs.loading.close()
    }
  }
})
</script>
