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
            <vs-th>
              Service
            </vs-th>
            <vs-th>
              Submitted By
            </vs-th>
            <vs-th>
              Amount
            </vs-th>

            <vs-th>
              Cover Letter
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

              <vs-td
                :data="tr.service"
              >
                {{ get(tr, "service.name") || "12938710237012938120983" }} <br />

              </vs-td>
              <vs-td :data="tr.user">
                <span>{{ get(tr, "user.profile.name") }} <vs-icon icon="open_in_browser" /></span>
              </vs-td>
              <vs-td :data="tr.amount">
                {{ tr.amount }} AUD
              </vs-td>

              <vs-td
                :data="tr.coverLetter"
                class="truncate"
                style="max-width: 100px">
                <vx-tooltip :text="tr.coverLetter">
                  {{ tr.coverLetter }}
                </vx-tooltip>

              </vs-td>

              <!--
              <vs-td :data="tr.scope.serviceType">
                {{ tr.scope.serviceType }}
              </vs-td> -->

              <vs-td :data="tr.createdAt">
                <vx-tooltip :text="tr.createdAt | formatDate">
                  {{ tr.createdAt | elapsedTime }}
                </vx-tooltip>
              </vs-td>
              <vs-td>
                <div class="flex justify-end">
                  <!-- <vs-button
                    type="filled"
                    icon="info"
                    @click="$vs.dialog({type: 'alert', title: `Proposal Detail`,text: `${JSON.stringify(tr, null, '\t')}`})" /> -->
                  <!-- <vx-tooltip :text="tr.isFav ? 'Remove from Favorite' : 'Mark as Favorite'">
                    <vs-button
                      :color="tr.isFav ? 'warning' : 'light'"
                      class="mr-2"
                      icon="star"
                      type="filled"
                      @click="toggleFavorite(tr)"/>
                  </vx-tooltip> -->
                  <vs-button
                    class="ml-2"
                    type="filled"
                    icon="delete"
                    color="danger"
                    @click="deleteRow(tr._id)"/>
                </div>
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
import {startCase, get} from "lodash"

export default Vue.extend({
  data: () => {
    return {
      rows: [],
      searchText: "",
      label: "Proposal"
    }
  },
  computed: {
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
    get,
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

    async acceptConfirm (rowId) {
      this.$vs.loading({text: "Deleting....."})
      try {
        await axios.delete("/proposals/" + rowId)
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
      finally {
        this.$vs.loading.close()
      }
    },
    async reloadData () {
      this.$vs.loading({text: `Loading ${this.label}s ...`})
      const {data} = await axios.get("/proposals")
      this.rows = data
      this.$vs.loading.close()
    }
  }
})
</script>
