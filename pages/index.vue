<script>
import { validFeeds } from '~/common/api'

export default {
  meta: {
    public: true
  },
  fetch({ redirect }) {
    redirect('/' + validFeeds[0])
  }
}
</script>
