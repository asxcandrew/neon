<template>
  <div class="item-view view">
    <div class="item-view-header">
      <a :href="item.link" target="_blank">
        <h1 v-text="item.title" />
      </a>
      <span v-if="item.link" class="host">
        ({{ item.link | host }})
      </span>
      <p class="meta">
        {{ item.score }} points | by
        <router-link :to="'/user/' + item.author">
          {{ item.author }}
        </router-link>
        {{ item.created_at | timeAgo }} ago
      </p>
      <p>
        {{ item.html_body }}
      </p>
    </div>
    <div class="item-view-comments">
      <comment-form :ancestor="item"/>
      <!-- <lazy-wrapper :loading="item.loading">
        <p class="item-view-comments-header">
          {{ item.comments ? item.comments.length + ' comments' : 'No comments yet.' }}
        </p>
        <ul class="comment-children">
          <comment v-for="comment in item.comments" :key="comment.id" :comment="comment" />
        </ul>
      </lazy-wrapper> -->
    </div>
  </div>
</template>

<script>
import Comment from '~/components/comment.vue'
import CommentForm from '~/components/comment-form.vue'
import LazyWrapper from '~/components/lazy-wrapper'

export default {
  name: 'ItemView',
  components: { Comment, LazyWrapper, CommentForm },
  meta: {
    public: true
  },
  head() {
    return {
      title: this.item.title
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    },
    item() {
      return this.$store.state.item.items[this.id]
    }
  },

  fetch({ store, params: { id } }) {
    return store.dispatch('FETCH_ITEM', { id })
  }
}
</script>

<style lang="stylus">
.item-view-header {
  background-color: #fff;
  padding: 1.8em 2em 1em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  h1 {
    display: inline;
    font-size: 1.5em;
    margin: 0;
    margin-right: 0.5em;
  }

  .host, .meta, .meta a {
    color: #595959;
  }

  .meta a {
    text-decoration: underline;
  }
}

.item-view-comments {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 2em 0.5em;
}

.item-view-comments-header {
  margin: 0;
  font-size: 1.1em;
  padding: 1em 0;
  position: relative;

  .spinner {
    display: inline-block;
    margin: -15px 0;
  }
}

.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 600px) {
  .item-view-header {
    h1 {
      font-size: 1.25em;
    }
  }
}
</style>
