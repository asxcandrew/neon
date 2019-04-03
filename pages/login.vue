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
        v-model.trim="email"
        :error-messages="emailErrors()"
        :label="$t('form.email.name')"
        required
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model.trim="password"
        :error-messages="passwordErrors()"
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.password.name')"
        required
        @click:append="showPassword = !showPassword"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginView',
  mixins: [validationMixin],
  meta: {
    public: true,
    auth: true
  },
  validations: {
    password: { required },
    email: { required, email }
  },
  data: () => ({
      showPassword: false,
      password: '',
      email: ''
    }),
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('SIGN_IN', {
            email: this.email,
            password: this.password
          })
          .catch(() => {})
      }
    },
    passwordErrors(){
      const errors = []
      if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push(this.$t('form.password.required'))
      return errors
    },
    emailErrors(){
      const errors = []
      if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push(this.$t('form.email.incorrect'))
        !this.$v.email.required && errors.push(this.$t('form.email.required'))
      return errors
    }
  }
}
</script>

<style lang="stylus">

</style>
