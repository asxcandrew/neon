<template>
  <div>  
  <navigation v-bind:show="showNavigation" @close="showNavigation=false"/>

  <v-toolbar dark color="primary">
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click.stop="showNavigation = !showNavigation"
    >
    </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Neon</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="(list, key) in feeds" :key="key" @click.native="$router.push({ path: `/${key}` })">
        {{ list.title }}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn v-if="loggedIn" icon class="hidden-sm-and-down">
      <v-icon>bookmark</v-icon>
    </v-btn>
    <v-toolbar-items v-if="loggedIn" class="hidden-sm-and-down">
      <v-btn flat >{{ session.user.username }}</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else class="hidden-sm-and-down">
      <v-btn flat @click.native="$router.push('login')">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { feeds } from '~/common/api';
import Navigation from './navigation';

export default {
  name: 'common-header',
  components: {
    Navigation
  },
  data () {
    return {
      showNavigation: false
    }
  },
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
