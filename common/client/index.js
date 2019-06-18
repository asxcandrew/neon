import Item from './item';
import User from './user';
import Feed from './feed';
import Auth from './auth';
import Bookmark from './bookmark';
import Media from './media';

/**
 * Create an instance of Galas api
 *
 * @param {Axious} Axios instance to work with
 * @return {Galas} A new instance of Galas
 */

function Galas() {
  this.Item = new Item('items')
  this.User = new User('users')
  this.Feed = new Feed('feed')
  this.Auth = new Auth('auth')
  this.Bookmark = new Bookmark('bookmarks')
  this.Media = new Media('media')
}

function createInstance() {
  return new Galas();
}

export default { createInstance };
