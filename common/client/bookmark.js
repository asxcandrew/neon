import { BaseResource } from './base';

class BookmarkResource extends BaseResource {
    create(itemId, comment){
        let url = `/${this.base}/`;
    
        return this.api.$post(url, {item_id: itemId});
    };
    fetch(page){
        if (page == undefined){
            page = 1
        }
        return this.query({page: page})
    }
};

export default BookmarkResource;
