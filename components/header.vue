<template>
  <div>  
  <navigation v-bind:show="showNavigation" @close="showNavigation=false"/>

  <v-toolbar
    class="theme--gradient"
    >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click.stop="showNavigation = !showNavigation"
    >
    </v-toolbar-side-icon>
    <v-toolbar-title >Neon</v-toolbar-title>
      <v-toolbar-title v-for="(list, key) in feeds" :key="key" class="hidden-sm-and-down">
        <router-link :to="`/${key}`">
          {{ list.title }}
        </router-link>
      </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <router-link
      to="/bookmarks"
      v-if="loggedIn"
      icon
      class="hidden-sm-and-down"
      >
      <v-icon>bookmark</v-icon>
    </router-link>
      <v-menu :nudge-width="100" v-if="loggedIn">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on" class="hidden-sm-and-down">
            <span>{{ session.user.username }}</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>
        <v-list>
          <v-list-tile @click="$router.push({ path: '/item/new' })">
            <v-list-tile-title>{{ $t("views.header.createItem") }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>{{ $t("views.header.settings") }}</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="logout">
            <v-list-tile-title>{{ $t("views.header.logout") }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    <v-toolbar-title v-else class="hidden-sm-and-down">
      <router-link to="/login">
        Login
      </router-link>
    </v-toolbar-title>
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
  methods: {
    logout: function() {
      this.$store.dispatch('SIGN_OUT')
    },
  }
}
</script>
<style lang="scss">
.v-toolbar{
  &.theme--gradient{
    background: -moz-linear-gradient(left, #3a4eff 0%, #c532ff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #3a4eff 0%,#c532ff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #3a4eff 0%,#c532ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    color: white;
    .v-icon, a{
      color: white;
    }
  }
  box-shadow: none;
}
</style>
