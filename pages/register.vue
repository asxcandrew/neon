<template>
  <div class="view">
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-card class="view-block">
           <v-card-title primary-title>
          <span class="title headline">{{ $t("views.signup.title") }}</span>
          <span class="grey--text">{{ $t("views.signup.message") }}</span>
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
            v-model.trim="username"
            :error-messages="usernameErrors()"
            :label="$t('form.username.name')"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
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
          <v-text-field
            v-model.trim="passwordConfirmation"
            :error-messages="passwordConfirmationErrors()"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('form.passwordConfirmation.name')"
            required
            @click:append="showPassword = !showPassword"
            @input="$v.passwordConfirmation.$touch()"
            @blur="$v.passwordConfirmation.$touch()"
          ></v-text-field>
        </form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue" @click="onSubmit">{{ $t("views.signup.submitButton") }}</v-btn>
      </v-card-actions>
      </v-card>
      <p class="auth-info">
        {{ $t("views.signup.signInProposal") }}
        <router-link to="/login">
          {{ $t("views.login.submitButton") }}
        </router-link>
      </p>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
const UsernameMinLength = 3;
const UsernameMaxLength = 10;
const PasswordMinLength = 8;

import { usernameUniqness } from '~/common/validators';
import { validationMixin } from 'vuelidate';
import { required, email, sameAs, maxLength, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterView',
  mixins: [validationMixin],
  meta: {
    public: true,
    auth: true
  },
  validations: {
    password: {
      required,
      minLength: minLength(PasswordMinLength)
    },
    username: {
      required,
      minLength: minLength(UsernameMinLength),
      maxLength: maxLength(UsernameMaxLength),
      uniqness: usernameUniqness
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    },
    email: { required, email }
  },
  data: () => ({
      showPassword: false,
      password: '',
      username: '',
      passwordConfirmation: '',
      email: ''
    }),
  methods: {
    onSubmit() {
      let self = this;

      if (!this.$v.$invalid) {
        this.$store
          .dispatch('SIGN_UP', {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then(() => {
            self.$router.push({ path: '/' })
          })
          .catch(() => {})
      }
    },
    passwordErrors(){
      const errors = []
      if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push(this.$t('form.password.required'))
        !this.$v.password.minLength && errors.push(this.$t('form.password.length'))
      return errors
    },
    emailErrors(){
      const errors = []
      if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push(this.$t('form.email.incorrect'))
        !this.$v.email.required && errors.push(this.$t('form.email.required'))
      return errors
    },
    usernameErrors(){
      const errors = []
      if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push(this.$t('form.username.required'))
        !this.$v.username.minLength && errors.push(this.$t('form.username.length'))
        !this.$v.username.maxLength && errors.push(this.$t('form.username.length'))
        !this.$v.username.uniqness && errors.push(this.$t('form.username.taken'))
      return errors
    },
    passwordConfirmationErrors(){
      const errors = []
      if (!this.$v.passwordConfirmation.$dirty) return errors
        !this.$v.passwordConfirmation.sameAsPassword && errors.push(this.$t('form.passwordConfirmation.incorrect'))
        !this.$v.passwordConfirmation.required && errors.push(this.$t('form.passwordConfirmation.required'))
      return errors
    }
  }
}
</script>

<style lang="stylus">
</style>
