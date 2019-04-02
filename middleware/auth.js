export default ({ store, route, redirect }) => {
  const meta  = route.meta.find((meta) => {
    return meta.public
  }) || {}
  if (!store.getters.loggedIn && !meta.public) return redirect('/')
}
