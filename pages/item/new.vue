<template>
  <div class="view">
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-card class="view-block">
           <v-card-title primary-title>
          <span class="title headline">{{ $t("views.login.title") }}</span>
          <span class="grey--text">{{ $t("views.login.message") }}</span>
        </v-card-title>
    <form class="auth-form">
      <v-text-field
        v-model.trim="title"
        :label="$t('form.email.name')"
      ></v-text-field>
      <v-text-field
        v-model.trim="link"
        :label="$t('form.email.name')"
      ></v-text-field>
      <v-text-field
        v-model.trim="html_body"
        :label="$t('form.email.name')"
      ></v-text-field>
    </form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue" @click="onSubmit">{{$t('views.login.submitButton')}}</v-btn>
      </v-card-actions>
      </v-card>
      <p class="auth-info">
        {{ $t("views.login.signUpProposal") }}
        <router-link to="/register">
          {{ $t("views.login.signUpButton") }}
        </router-link>
      </p>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
export default {
  name: 'NewItem',
  data: () => ({
    link: '',
    html_body: '',
    title: ''
  }),
  methods: {
    onSubmit(){
      this.$store
          .dispatch('CREATE_ITEM', {
            link: this.link,
            html_body: this.html_body,
            title: this.title,
            type: "story"
          })
    }
  },
  head() {
    return {
      title: "this.item.title"
    }
  }
}
</script>

<style lang="stylus">

</style>
