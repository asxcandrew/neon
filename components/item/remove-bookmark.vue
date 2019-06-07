
<template>
  <v-btn icon ripple @click="onDelete(item.id)">
    <v-icon color="grey lighten-1">delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'remove-bookmark',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDelete(item_id){
      this.$store.dispatch('DELETE_BOOKMARK', {item_id})
    },
  }
}
</script>
