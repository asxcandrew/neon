export const lazy = (commit, task, optimistic, enabled) => {
  // Do real task in background
  return Promise.resolve(task())
    .then(commit)
    .catch(console.error) // eslint-disable-line no-console

  // Commit optimistic value and resolve
  // console.log("!Commit optimistic value and resolve")
  // return Promise.resolve(commit(optimistic))
}
