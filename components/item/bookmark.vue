
<template>
  <v-btn icon ripple @click="addToBookmarks(item)">
    <v-icon color="grey lighten-1">bookmark</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'add-bookmark',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToBookmarks(item){
      let comment = ""
      this.$store
        .dispatch('CREATE_BOOKMARK', {item, comment})
    },
  },
}
</script>
