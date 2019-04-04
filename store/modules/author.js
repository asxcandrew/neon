import Vue from 'vue';

import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

export default {
  state: () => {
    const state = {
      authors: {
        /* [username: string]: User */
      }
    }
    return state
  },
  actions: {
    FETCH_AUTHOR({ state, commit }, { id }) {
      return lazy(
        (data) => {
          let user = data.payload;
          commit('SET_AUTHOR', { id, user })
        },
        () => Client.User.with(this.$axios).get(id)
      )
    }
  },
  mutations: {
    SET_AUTHOR: (state, { id, user }) => {
      Vue.set(state.authors, id, user || false) /* false means user not found */
    }
  }
}
