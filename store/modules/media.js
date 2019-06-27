import Vue from 'vue'

import { Client } from '~/common/api'
import { lazy } from '~/common/utils'

export default {
  state: () => {
    const state = {
    }
    return state
  },

  actions: {
    UPLOAD_MEDIA({ commit }, file ) {
      Client.Media.with(this.$axios).presignedURL(file.type)
        .then((res) => {
          Client.Media.with(this.$axios).uploadFile(res.payload.url, file)
        })
    }
  }
}
