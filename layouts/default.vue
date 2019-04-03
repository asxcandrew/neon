<template>
  <div id="app">
    <common-header></common-header>
    <v-container>
      <nuxt nuxt-child-key="none" role="main" />
    </v-container>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from '~/components/footer'
import CommonHeader from '~/components/header'

export default {
  components: { CommonFooter, CommonHeader },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host

    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: 'canonical', href: `https://${host}${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding: 0;
  color: #34495e;
  overflow-y: scroll;
}

a {
  color: #2196f3;
  text-decoration: none;
}
</style>
