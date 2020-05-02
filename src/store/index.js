import Vue from "vue"
import Vuex from "vuex"

import state from "./state"
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    mutate (state, payload) {
      state[payload.property] = payload.with
    }
  },
  actions: {
    async fetchData ({ rootState, commit }, payload) {
      try {
        let body = {
          language: rootState.authStore.currentLocale.locale
        }
        if (payload) {
          body = Object.assign({
          }, payload.body, body)
        }
        const response = await axios.post(
          `api.factory.com/${payload.url}`,
          body,
          rootState.config.serviceHeaders
        )
        if (payload.commit) {
          commit("mutate", {
            property: payload.stateProperty,
            with: response.data[payload.stateProperty]
          })
        }
        return response.data
      } catch (error) {
        throw error
      }
    }
  },
  modules: {
  }
})
