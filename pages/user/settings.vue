<template>
  <div class="view">
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-card class="view-block">
           <v-card-title primary-title>
          <span class="title headline">{{ $t('views.settings.title') }}</span>
        </v-card-title>
    <form class="auth-form">
      <v-layout wrap>
        <v-flex xs10>
          <v-text-field
            label="Select Image"
            class="avatar-input"
            @click='pickFile'
            v-model='imageName'
            prepend-icon='attach_file'
            :append-icon='imageAppendIcon'
            @click:append="clearFileInput"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn flat color="blue" @click="onSubmitUpload" :disabled="!imageChoosen">{{$t('views.settings.submitButton')}}</v-btn>
        </v-flex>
      </v-layout>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      >
      <v-text-field
        v-model.trim="user.about"
        :label="$t('form.about.name')"
      ></v-text-field>
      <v-text-field
        disabled
        v-model.trim="user.username"
        :label="$t('form.username.name')"
      ></v-text-field>
      <v-text-field
        disabled
        v-model.trim="user.email"
        :label="$t('form.email.name')"
      ></v-text-field>
    </form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue" @click="onSubmit">{{$t('views.settings.submitButton')}}</v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'settings',
  computed: {
    ...mapGetters(['session']),
    imageChoosen() {
      return this.imageName != ''
    },
    imageAppendIcon(){
      if (this.imageChoosen){
        return 'cancel'
      }
      return ''
    },
  },
  data() {
    return {
      imageName: '',
      imageFile: '',
      user: this.$store.getters.session.user,
    }
  },
  methods: {
    pickFile () {
        this.$refs.image.click();
    },
    onSubmit(){
      this.$store.dispatch('UPDATE_USER',
        {
          about: this.user.about
        }
      )
    },
    onSubmitUpload(){
      this.uploadAvatar(this.imageFile)
    },
    clearFileInput(){
      this.imageName = ''
      this.imageFile = ''
    },
    handleUploadInput(){
      this.avatar = this.$refs.avatar.files[0];
    },
    onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					// this.imageUrl = fr.result // image url to show preview
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
			}
    },
    uploadAvatar(file){
      this.$store
        .dispatch('UPLOAD_MEDIA', file)
        .catch(() => {})
    }
  },
};
</script>

<style lang="stylus">
  .avatar-input{
    .v-input__icon--append{
      cursor: pointer;
    }
  }
</style>
