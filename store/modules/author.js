import Vue from 'vue';

import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

export default {
  state: () => {
    const state = {
      authors: {
        /* [id: string]: User */
      }
    }
    return state
  },
  actions: {
    FETCH_AUTHOR({ state, commit }, { id }) {
      return lazy(
        user => commit('SET_AUTHOR', { id, user }),
        () => Client.User.with(this.$axios).get(id),
        Object.assign({ id, loading: true }, state.users[id])
      )
    }
  },
  mutations: {
    SET_AUTHOR: (state, { id, user }) => {
      Vue.set(state.users, id, user || false) /* false means user not found */
    }
  }
}
