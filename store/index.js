import Vuex from 'vuex';

import item from './modules/item';
import auth from './modules/auth';
import feed from './modules/feed';
import author from './modules/author';

const createStore = () => {
  return new Vuex.Store( { modules: { item, auth, feed, author } })
}

export default createStore
