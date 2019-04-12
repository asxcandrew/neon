<template>
  <v-layout
    wrap
  >
    <v-navigation-drawer
      v-model="show"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <!-- <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar> -->
          <v-list-tile-content v-if="loggedIn">
            <v-list-tile-title>{{ session.user.username }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content @click.stop="$router.push('/login')" v-else>
            <v-list-tile-title >Login</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="emitClose">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-if="loggedIn">
        <v-divider light></v-divider>
        <v-list-tile @click.native="$router.push({ path: '/item/new' })">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("views.header.createItem") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("views.header.settings") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile
          v-for="(list, key) in feeds"
          :key="key"
          @click.native="$router.push({ path: `/${key}` })"
        >
          <!-- <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action> -->

          <v-list-tile-content>
            <v-list-tile-title>{{ list.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-if="loggedIn">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title @click="logout">{{ $t("views.header.logout") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import { feeds } from '~/common/api';

export default {
  name: 'navigation',
  props: {
    show: Boolean,
  },
  computed: {
    ...mapGetters({
      session: 'session',
      loggedIn: 'loggedIn'
    }),
    feeds: () => feeds
  },
  methods: {
    emitClose: function() {
      this.$emit("close");
    },
    logout: function() {
      this.$store.dispatch('SIGN_OUT')
    },
  }
}
</script>
