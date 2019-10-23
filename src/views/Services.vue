<template>
  <div>

    <vs-card class="p-5">
      <div
        slot="header"
        class="flex items-center justify-between">
        <h3>{{ label }}s</h3>
        <div class="flex">
          <vs-input
            v-model="searchText"
            placeholder="Enter text to search..."
          />
          <vs-button
            icon="refresh"
            color="primary"
            type="filled"
            class="ml-2"
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
        <vs-table
          :data="filteredRows"
          pagination>
          <template slot="thead">
            <vs-th sort-key="name">
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
                <div class="flex">
                  <vx-tooltip :text="tr.isFav ? 'Remove from Favorite' : 'Mark as Favorite'">
                    <vs-button
                      :color="tr.isFav ? 'primary' : 'light'"
                      class="mr-2"
                      icon="star"
                      type="filled"
                      @click="toggleFavorite(tr)"/>
                  </vx-tooltip>
                  <vs-button
                    class="mr-2"
                    type="filled"
                    icon="info"
                    @click="$vs.dialog({type: 'alert', title: `Service Detail`,text: `${JSON.stringify(tr, null, '\t')}`})" />
                  <vs-button
                    type="filled"
                    icon="delete"
                    color="danger"
                    @click="deleteRow(tr._id)"/>
                </div>
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
import {startCase, get} from "lodash"

export default Vue.extend({
  data: () => {
    return {
      rows: [],
      searchText: "",
      label: "Service"
    }
  },
  computed: {
    basePath: () => apiConfig.EXTERNAL_ASSETS_BASEURL,
    filteredRows () {
      return this.rows.filter((row) => {
        if (this.searchText) {
          return JSON.stringify(row).match(RegExp(this.searchText, "i"))
        }
        else {
          return true
        }
      })
    }
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    startCase,
    deleteRow (rowId) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure",
        text: `You want to delete the ${this.label} with Id: ${rowId}`,
        accept: () => this.acceptConfirm(rowId)
      })
    },
    async toggleFavorite (row) {
      const toMake = row.isFav ? false : true
      this.$vs.loading({text: `Making ${this.label} Favorite`})
      try {
        await axios.patch(`/services/${row._id}/${toMake ? "true" : "false"}`)
        this.$vs.loading.close()
        this.$set(row, "isFav", toMake)
        this.$vs.notify({
          color: "success",
          title: "Done",
          text: `The selected ${this.label} was marked as ${toMake ? "Favorite" : "Not Favorite"} successfully`
        })
      } catch (e) {
        alert(get(e, "response.data") || e.message)
      }
    },
    async acceptConfirm (rowId) {
      try {
        await axios.delete("/services/" + rowId)
        this.$vs.notify({
          color: "danger",
          title: "Deleted",
          text: `The selected ${this.label} was successfully deleted`
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
      this.$vs.loading({text: `Loading ${this.label}s ...`})
      const {data} = await axios.get("/services")
      this.rows = data
      this.$vs.loading.close()
    }
  }
})
</script>
