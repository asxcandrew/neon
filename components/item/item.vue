<template>
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
      <component :is="action" v-bind:item="item"></component>
    </v-list-tile-action>
  </v-list-tile>
</template>
<script>
import { mapGetters } from 'vuex';
import AddBookmark from '~/components/item/bookmark.vue';
import RemoveBookmark from '~/components/item/remove-bookmark.vue';

export default {
  name: 'item-component',
  components: { AddBookmark, RemoveBookmark },
  props: {
    item: {
      type: Object,
      required: true
    },
    action: {
      required: false
    }
  },
};
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
