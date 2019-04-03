import store from 'store';
import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

const state = () => {
  return {
    session: store.get('session_info') || {}
  }
}

const getters = {
  session: (state) => {
    return state.session;
  },
  loggedIn: (state) => {
    return state.session && state.session.user && state.session.token_expiration > Date.now();
  }
};

const mutations = {
  DESTROY_SESSION(state) {
    state.session = {};
    store.set('session_info', state.session);
  },
  CHANGE_SESSION(state, data) {
    state.session = Object.assign({}, state.session, data);
    store.set('session_info', state.session);
  },
};

const actions = {
  SIGN_IN({ commit }, form) {
    return lazy(
      (res) => {
        let data = res.payload;
        commit('CHANGE_SESSION',{ token: data.token, token_expiration: Date.parse(data.expire), user: data.user })
      },
      () => {
        return Client.Auth.with(this.$axios).login(
          form.email,
          form.password
        );
      }
    )
  },
  SIGN_UP({ commit }, {email, username, password} ) {
    return lazy(
      (res) => {
        let data = res.payload;
        commit('CHANGE_SESSION',
          { token: data.token, token_expiration: Date.parse(data.expire), user: data.user }
        );
      },
      () => Client.Auth.with(this.$axios).register(email, username, password)
    )
  },
  SIGN_OUT({ commit }) {
    return (async () => {
      commit('DESTROY_SESSION');
    })();
  },
};

export default { state, getters, mutations, actions };
