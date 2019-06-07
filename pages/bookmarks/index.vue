<template>
  <div class="view">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm12 md9 lg6>
        <v-card v-if="present">
          <v-list two-line>
            <div
              v-for="(bookmark, index) in pageData"
              transition="slide-x-transition"
              v-bind:key="bookmark.id"
            >
                <item-component
                  v-bind:item=bookmark.item
                  v-bind:action=itemAction
                />
              <v-divider
                v-if="index + 1 < pageData.length"
                :key="index"
              ></v-divider>
            </div>
          </v-list>
        </v-card>
        <template v-if="present && totalPages > 1">
          <div class="text-xs-center">
            <v-pagination
              v-model="displayedPage"
              :value="displayedPage"
              :length="totalPages"
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
import { maxPage } from '~/common/utils';
import ItemComponent from '~/components/item/item.vue';

export default {
  name: 'bookmarks',
  components: { ItemComponent },
  watch: {
    displayedPage: 'pageChanged'
  },
  mounted() {
    this.pageChanged(this.page)
  },
  data() {
    return {
      displayedPage: Number(this.page) || 1,
      itemAction: 'remove-bookmark'
    }
  },
  computed: {
    ...mapGetters({
      getBookmarksByPage: 'getBookmarksByPage'
    }),
    page() {
      return Number(this.$route.params.page) || 1
    },
    totalPages() {
      return maxPage(1, 10)
    },
    pageData() {
      return this.getBookmarksByPage(this.displayedPage)
    },
    present(){
      return this.pageData.length > 0
    }
  },
  methods: {
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
