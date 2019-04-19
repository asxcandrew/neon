<template>
  <div class="view">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm12 md9 lg6>
          <v-card v-if="!loading">
            <v-list two-line>
              <template v-for="(item, index) in pageData" transition="slide-x-transition">
                <v-list-tile class="news-item">
                  <v-list-tile-action>
                    <span class="score">{{ item.score }}</span>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <template v-if="item.link">
                        <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
                        <span class="host"> ({{ item.link | host }})</span>
                      </template>
                      <template v-else>
                        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
                      </template>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <span class="by">
                        by
                        <router-link :to="'/user/' + item.author">{{ item.author }}</router-link>
                      </span>
                      <span class="time">
                        {{ item.created_at | timeAgo }} ago
                      </span>
                      <span class="comments-link">
                        |
                        <router-link :to="'/item/' + item.id">{{ item.comments_count }} comments</router-link>
                      </span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple @click="addToBookmarks(item)">
                      <v-icon color="grey lighten-1">bookmark</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider
                  v-if="index + 1 < pageData.length"
                  :key="index"
                ></v-divider>
              </template>
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
import { mapGetters } from 'vuex';

export default {
  meta: {
    public: true
  },

  validate({ params: { feed } }) {
    return validFeeds.includes(feed)
  },

  data() {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.page) || 1
    }
  },

  computed: {
    ...mapGetters({
      getFeedPage: 'getFeedPage',
      loggedIn: 'loggedIn'
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
    addToBookmarks(item){
      let comment = ""
      this.$store
        .dispatch('CREATE_BOOKMARK', {item, comment})
    },
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

<style lang="stylus">
.news-item {
  line-height: 20px;

  .score {
    color: #C75000;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }

  .meta, .host {
    font-size: 0.85em;
    color: #595959;

    a {
      color: #595959;
      text-decoration: underline;

      &:hover {
        color: #C75000;
      }
    }
  }
}
</style>
