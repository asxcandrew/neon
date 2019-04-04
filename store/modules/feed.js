import Vue from 'vue'

import { validFeeds, Client } from '~/common/api'
import { lazy } from '~/common/utils'

export default {
  state: () => {
    const state = {
      feeds: {
        /* [page: number] : [ [id: number] ] */
      }
    }

    validFeeds.forEach((feed) => {
      state.feeds[feed] = {}
    })

    return state
  },
  getters: {
    getFeedPage: state => (feed, page) => {
      let ids = state.feeds[feed][page] || [];

      return ids.map(id => state.item.items[id])
    }
  },
  actions: {
    FETCH_FEED({ commit, state }, { feed, page }) {
      // Don't priorotize already fetched feeds
      // if (state.feeds[feed][page] && state.feeds[feed][page].length) {
      //   prefetch = true
      // }

      return lazy(
        (data) => {
          if (data != undefined) {
            let items = data.payload || []
            const ids = items.map(item => item.id)
            commit('SET_FEED', { feed, ids, page })
            commit('SET_ITEMS', { items })
          }
        },
        () => Client.Feed.with(this.$axios).get(feed, page)
      )
    }
  },
  mutations: {
    SET_FEED: (state, { feed, ids, page }) => {
      Vue.set(state.feeds[feed], page, ids)
    }
  }
}
