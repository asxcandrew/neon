<template>
  <div class="view">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm12 md9 lg6>
          <v-card v-if="!loading">
            <v-list two-line>
              <div
                v-for="(item, index) in pageData"
                transition="slide-x-transition"
                v-bind:key="item.id"
              >
                <item-component
                  v-bind:item=item
                  v-bind:action=itemAction
                />
                <v-divider
                  v-if="index + 1 < pageData.length"
                  :key="index"
                ></v-divider>
              </div>
            </v-list>
          </v-card>
          <template v-if="!loading">
            <div class="text-xs-center">
              <v-pagination
                v-model="displayedPage"
                :value="displayedPage"
                :length="maxPage"
                color="blue"
                :total-visible="5"
                circle
              ></v-pagination>
            </div>
          </template>
            <div class="text-xs-center" v-if="loading">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import { feeds, validFeeds } from '~/common/api';
import ItemComponent from '~/components/item/item.vue';
import { mapGetters } from 'vuex';

export default {
  components: { ItemComponent },
  meta: {
    public: true
  },

  validate({ params: { feed } }) {
    return validFeeds.includes(feed)
  },

  data() {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.page) || 1,
      itemAction: "add-bookmark",
    }
  },

  computed: {
    ...mapGetters({
      getFeedPage: 'getFeedPage',
    }),
    feed() {
      return this.$route.params.feed
    },
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage() {
      return feeds[this.feed].pages
    },
    pageData() {
      return this.getFeedPage(this.feed, this.displayedPage)
    },
    loading() {
      return this.pageData.length === 0
    }
  },

  watch: {
    displayedPage: 'pageChanged'
  },

  fetch({ store, params: { feed, page = 1 } }) {
    return store.dispatch('FETCH_FEED', { feed, page })
  },

  head() {
    return {
      title: feeds[this.$route.params.feed].title
    }
  },

  mounted() {
    this.pageChanged(this.page)
  },

  methods: {
    pageChanged(to, from = -1) {
      if (to < 0 || to > this.maxPage) {
        this.$router.replace(`/${this.feed}/1`)
        return
      }

      this.$store
        .dispatch('FETCH_FEED', {
          feed: this.feed,
          page: this.displayedPage
        })
        .catch(() => {})

      this.transition =
        from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
    }
  }
}
</script>

