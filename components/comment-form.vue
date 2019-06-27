<template>
  <div class="view">
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
          <!-- <v-card-title primary-title>
            <span class="title headline">{{ $t("views.newItem.title") }}</span>
          </v-card-title> -->
          <form class="auth-form">
            <v-textarea
              v-model.trim="html_body"
              :label="$t('form.body.name')"
            ></v-textarea>
          </form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="blue" @click="onSubmit">{{$t('views.newItem.submitButton')}}</v-btn>
          </v-card-actions>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'comment-form',
  data: () => ({
    html_body: ''
  }),
  props: {
    ancestor: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSubmit(){
      this.$store
        .dispatch('CREATE_ITEM', {
          html_body: this.html_body,
          type: "comment",
          ancestor_id: this.ancestor.id,
        })
    }
  },
}
</script>
<style>
</style>
