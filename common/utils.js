const lazy = (commit, task) => {
  // Do real task in background
  return Promise.resolve(task())
    .then(commit)
    .catch(console.error) // eslint-disable-line no-console
}

function maxPage(total, perPage) {
  return Math.ceil(total/perPage);
}

export { lazy, maxPage }