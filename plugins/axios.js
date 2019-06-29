export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        if(!config.url.startsWith('http')) {
            config.headers.common['Authorization'] = `Bearer ${store.state.auth.session.token}`;
        }
    })
}
