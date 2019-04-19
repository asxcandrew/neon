import Vue from 'vue';

import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

export default {
  state: () => {
    return {
      bookmarks: [],
      total: 0
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
    DELETE_BOOKMARK({ state, commit }, { id }) {
      return lazy(
        ({payload}) => {
          commit('REMOVE_BOOKMARK', { id })
        },
        () => Client.Bookmark.with(this.$axios).delete(id)
      )
    }
  },
  mutations: {
    SET_TOTAL: (state, { total }) => {
      Vue.set(state, 'total', total)
    },
    ADD_BOOKMARKS: (state, { bookmarks }) => {
      Vue.set(state, 'bookmarks', bookmarks)
    },
    REMOVE_BOOKMARK: (state, { id }) => {
      // Vue.set(state, 'bookmarks', bookmarks)
    }
  }
}
