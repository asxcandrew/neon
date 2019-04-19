<template>
  <div class="view">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm12 md9 lg6>
        <v-card v-if="present">
          <v-list two-line>
            <template v-for="(bookmark, index) in pageData" transition="slide-x-transition">
              <v-list-tile class="news-item">
                <v-list-tile-action>
                  <span class="score">{{ bookmark.item.score }}</span>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <template v-if="bookmark.item.link">
                      <a :href="bookmark.item.link" target="_blank" rel="noopener">{{ bookmark.item.title }}</a>
                      <span class="host"> ({{ bookmark.item.link | host }})</span>
                    </template>
                    <template v-else>
                      <router-link :to="'/item/' + bookmark.item.id">{{ item.title }}</router-link>
                    </template>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span class="by">
                      by
                      <router-link :to="'/user/' + bookmark.item.author">{{ bookmark.item.author }}</router-link>
                    </span>
                    <span class="time">
                      {{ bookmark.item.created_at | timeAgo }} ago
                    </span>
                    <span class="comments-link">
                      |
                      <router-link :to="'/item/' + bookmark.item.id">{{ bookmark.item.comments_count }} comments</router-link>
                    </span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple @click="onDelete(bookmark.id)">
                    <v-icon color="grey lighten-1">delete</v-icon>
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
        <template v-if="present">
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
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'bookmarks',
  watch: {
    displayedPage: 'pageChanged'
  },
  mounted() {
    this.pageChanged(this.page)
  },
  data() {
    return {
      displayedPage: Number(this.page) || 1
    }
  },
  computed: {
    ...mapGetters({
      getBookmarksByPage: 'getBookmarksByPage'
    }),
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage() {
      return 10
    },
    pageData() {
      return this.getBookmarksByPage(this.displayedPage)
    },
    present(){
      return this.pageData.length > 0
    }
  },
  methods: {
    onDelete(id){
      this.$store.dispatch('DELETE_BOOKMARK', {id})
    },
    pageChanged(to, from = -1) {
      this.$store
        .dispatch('FETCH_BOOKMARKS', {
          page: this.displayedPage
        })
        .catch(() => {})
    }
  }
}
</script>
