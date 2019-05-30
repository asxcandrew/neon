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
    FETCH_ITEM({ commit }, { id }) {
      return lazy(
        (data) => {
          let item = data.payload;
          commit('SET_ITEM', { item });
          return item;
        },
        () => Client.Item.with(this.$axios).get(id)
      )
    },
    CREATE_ITEM({ commit }, payload) {
      return lazy(
        (data) => {
          let item = data.payload;
          commit('SET_ITEM', { item });
          return item;
        },
        () => Client.Item.with(this.$axios).post(payload)
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
