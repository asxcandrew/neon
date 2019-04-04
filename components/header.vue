<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <!-- <router-link to="/" exact> -->
      <v-toolbar-title class="white--text">Neon</v-toolbar-title>
    <!-- </router-link> -->
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="(list, key) in feeds" :key="key" @click.native="$router.push({ path: `/${key}` })">
        {{ list.title }}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn v-if="loggedIn" icon>
      <v-icon>bookmark</v-icon>
    </v-btn>
    <v-toolbar-items v-if="loggedIn" class="hidden-sm-and-down">
      <v-btn flat >{{ session.user.username }}</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else class="hidden-sm-and-down">
      <v-btn flat @click.native="$router.push('login')">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import { mapGetters } from 'vuex';
import { feeds } from '~/common/api';

export default {
  name: 'common-header',
    computed: {
    ...mapGetters({
      session: 'session',
      loggedIn: 'loggedIn'
    }),
    feeds: () => feeds
  },
}
</script>
<style>
</style>
