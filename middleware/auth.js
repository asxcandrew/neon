export default ({ store, route, redirect }) => {
  let pub = false
  let auth = false

 route.meta.forEach((meta) => {
  if (!pub) pub = meta.public
  if (!auth) auth = meta.auth
 })

  if (!store.getters.loggedIn && !pub) return redirect('/')
  if (store.getters.loggedIn && auth) return redirect('/')
}
