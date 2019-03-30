import store from 'store';
import { Client } from '~/common/api';

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
  SIGN_IN({ commit, dispatch }, form) {
    return lazy(
      res => {
        commit(CHANGE_SESSION,{ token: res.data.token, token_expiration: Date.parse(res.data.expire), user: res.data.user })
      },
      () => {
        Client.Auth.signin({
            email: form.email.trim(),
            password: form.password.trim(),
          })
      }
    )
  },
  SIGN_UP({ commit }, form ) {
    return lazy(
      (res) => {
        commit(CHANGE_SESSION,
          { token: res.data.token, token_expiration: Date.parse(res.data.expire), user: res.data.user }
        );
      },
      () => Client.Auth.signup(form)
    )
  },
  SIGN_OUT({ commit }) {
    return (async () => {
      commit(DESTROY_SESSION);
    })();
  },
};

export default { state, getters, mutations, actions };
