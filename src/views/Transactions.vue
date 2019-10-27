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
          pagination
        >
          <template slot="thead">
            <vs-th sort-key="email">
              Subscription ID
            </vs-th>
            <vs-th>
              Customer ID
            </vs-th>
            <vs-th>
              Sub Started From
            </vs-th>
            <vs-th>
              Sub Ending At
            </vs-th>
            <vs-th>
              Download Payment as JSON
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

              <vs-td :data="tr.id">
                {{ tr.id }}
              </vs-td>

              <vs-td :data="tr.customer">
                {{ tr.customer }}
              </vs-td>

              <vs-td :data="tr.current_period_start">
                {{ moment(tr.current_period_start * 1000) }}
              </vs-td>
              <vs-td :data="tr.current_period_end">
                {{ moment(tr.current_period_end * 1000) }}
              </vs-td>
              <vs-td>
                <vs-button
                  color="light"
                  icon="cloud_download"
                  @click="downloadJson(tr)">DOWNLOAD</vs-button>
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
    <a
      id="downloadAnchorElem"
      href="#"></a>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import moment from "moment"
import {startCase, get, flatten} from "lodash"

export default Vue.extend({
  data: () => {
    return {
      rows: [],
      searchText: "",
      label: "Transaction"
    }
  },
  computed: {
    filteredRows () {
      return this.rows.filter((row) => {
        if (this.searchText) {
          return Object.values(row).join("|")
            .match(RegExp(this.searchText, "i"))
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
    moment,
    startCase,
    async toggleFavorite (row) {
      const toMake = row.isFav ? false : true
      this.$vs.loading({text: `Making ${this.label} Favorite`})
      try {
        await axios.patch(`/users/${row._id}/${toMake ? "true" : "false"}`)
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
    deleteRow (rowID) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure",
        text: `You want to delete the user with Id: ${rowID}`,
        accept: () => this.acceptConfirm(rowID)
      })
    },
    async acceptConfirm (rowId) {
      try {
        await axios.delete("/users/" + rowId)
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
          title: `Failed to delete ${this.label}`,
          text: "Reason: " + (e.response.data || e.message)
        })
      }
    },
    downloadJson (storageObj) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj, null, 2))
      const dlAnchorElem = document.getElementById("downloadAnchorElem")
      dlAnchorElem.setAttribute("href", dataStr)
      dlAnchorElem.setAttribute("download", "scene.json")
      dlAnchorElem.click()
    },
    async reloadData () {
      this.$vs.loading({text: `Loading ${this.label}s ...`})
      const {data} = await axios.get("/users")
      this.rows = flatten(data.map((user) => user.payment))
      console.log(this.rows)
      this.$vs.loading.close()
    }
  }
})
</script>
