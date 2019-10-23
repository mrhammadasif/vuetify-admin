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
              Email
            </vs-th>
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Professional Experience
            </vs-th>
            <vs-th sort-key="createdAt">
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

              <vs-td :data="tr.email">
                <span v-html="tr.email"></span><br>
                <span class="text-small">{{ tr._id }}</span>
              </vs-td>

              <vs-td :data="tr.profile.name">
                {{ tr.profile.name }}
              </vs-td>

              <vs-td :data="tr.profile.jobTitle">
                <strong>{{ tr.profile.jobTitle || "N/A" }}</strong> <br>
                {{ tr.profile.company || "N/A" }}
              </vs-td>

              <vs-td :data="tr.createdAt">
                <vx-tooltip :text="tr.createdAt | formatDate">
                  {{ tr.createdAt | elapsedTime }}
                </vx-tooltip>
              </vs-td>
              <vs-td>
                <div class="flex justify-end">
                  <vx-tooltip :text="tr.isFav ? 'Remove from Favorite' : 'Mark as Favorite'">
                    <vs-button
                      :color="tr.isFav ? 'primary' : 'light'"
                      class="mr-2"
                      icon="star"
                      type="filled"
                      @click="toggleFavorite(tr)"/>
                  </vx-tooltip>
                  <!-- <vs-button
                    class="mr-2"
                    type="filled"
                    icon="info"
                    @click="$vs.dialog({type: 'alert', title: `User Detail`,text: `${JSON.stringify(tr, null, '\t')}`})" /> -->
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
import {startCase, get} from "lodash"

export default Vue.extend({
  data: () => {
    return {
      rows: [],
      searchText: "",
      label: "User"
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
    async reloadData () {
      this.$vs.loading({text: `Loading ${this.label}s ...`})
      const {data} = await axios.get("/users")
      this.rows = data
      this.$vs.loading.close()
    }
  }
})
</script>
