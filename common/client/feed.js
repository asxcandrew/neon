import { BaseResource } from './base';

class FeedResource extends BaseResource {
  get(type, page) {
    let url = `/${this.base}`;

    if (type !== undefined) {
      url += `/${type}`;
    }
    return this.api.$get(url, {params: {page: page}});
  }
};

export default FeedResource;
