import client from './client'

const feeds = {
  top: { title: 'Top', pages: 10 },
  new: { title: 'Newest', pages: 10 },
  // ask: { title: 'Ask', pages: 2 },
  // show: { title: 'Show', pages: 2 },
  // jobs: { title: 'Jobs', pages: 1 }
}

const validFeeds = Object.keys(feeds);
const Client = client.createInstance()

export { validFeeds, feeds, Client };
