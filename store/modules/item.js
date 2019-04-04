import Vue from 'vue'

import { Client } from '~/common/api'
import { lazy } from '~/common/utils'

export default {
  state: () => {
    const state = {
      items: {
        /* [id: number]: Item */
      }
    }
    return state
  },

  actions: {
    FETCH_ITEM({ commit, state }, { id }) {
      return lazy(
        (data) => {
          let item = data.payload;
          commit('SET_ITEM', { item });
        },
        () => Client.Item.with(this.$axios).get(id)
      )
    }
  },
  mutations: {
    SET_ITEM: (state, { item }) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    },
    SET_ITEMS: (state, { items }) => {
      items.forEach((item) => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    }
  }
}
