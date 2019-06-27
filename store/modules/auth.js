import { Client } from '~/common/api';
import { lazy } from '~/common/utils';

export default {
  state: () => {
    return {
      session: {}
    }
  },
  getters: {
    session: (state) => {
      return state.session;
    },
    loggedIn: (state) => {
      return state.session && state.session.user && state.session.token_expiration > Date.now();
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      commit('CHANGE_SESSION', this.$cookies.get('session_info'))
    },
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
    UPDATE_USER({ commit, state }, { about, media_id } ) {
      return lazy(
        (res) => {
          let data = res.payload;
          commit('CHANGE_SESSION',
            { user: data.user }
          );
        },
        () => Client.User.with(this.$axios).put(
          state.session.user.username,
          {
            about: about,
            media_id: media_id
          })
      )
    }
  },
  mutations: {
    DESTROY_SESSION(state) {
      state.session = {};
      this.$cookies.set('session_info', state.session);
    },
    CHANGE_SESSION(state, data) {
      state.session = Object.assign({}, state.session, data);
      this.$cookies.set('session_info', state.session);
    },
  }
}
