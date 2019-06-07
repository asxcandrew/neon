import Vue from 'vue';

import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

export default {
  state: () => {
    return {
      bookmarks: [],
      total: 0,
      per_page: 0,
    }
  },
  getters: {
    getBookmarksByPage: (state) => (page) => {
      return state.bookmarks
    }
  },
  actions: {
    FETCH_BOOKMARKS({ state, commit }, { page }) {
      return lazy(
        ({payload}) => {
          commit('ADD_BOOKMARKS', payload)
          commit('SET_TOTAL', {total: payload.total})
          commit('SET_PER_PAGE', {total: payload.per_page})
        },
        () => Client.Bookmark.with(this.$axios).fetch(page)
      )
    },
    CREATE_BOOKMARK({ state, commit }, { item, comment }) {
      return lazy(
        ({payload}) => {
          commit('ADD_BOOKMARKS', { bookmarks: [payload] })
        },
        () => Client.Bookmark.with(this.$axios).create(item.id, comment)
      )
    },
    DELETE_BOOKMARK({ state, commit }, { item_id }) {
      return lazy(
        ({payload}) => {
          commit('REMOVE_BOOKMARK', { item_id })
        },
        () => Client.Bookmark.with(this.$axios).delete(item_id)
      )
    }
  },
  mutations: {
    SET_TOTAL: (state, { total }) => {
      Vue.set(state, 'total', total)
    },
    SET_PER_PAGE: (state, { per_page }) => {
      Vue.set(state, 'per_page', per_page)
    },
    ADD_BOOKMARKS: (state, { bookmarks }) => {
      Vue.set(state, 'bookmarks', bookmarks)
    },
    REMOVE_BOOKMARK: (state, { item_id }) => {
      var index = state.bookmarks.findIndex(b => b.item.id === item_id);
      state.bookmarks.splice(index, 1);
    }
  }
}
