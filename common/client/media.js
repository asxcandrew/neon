import { BaseResource } from './base';

class MediaResource extends BaseResource {
  presignedURL(type) {
    let url = `/${this.base}`;

    return this.api.$post(
      url,
        {
          params: {
            content_type: type
          }
        }
      );
  }
  uploadFile(url, file){
    return this.api.$put(
      url,
      file,
      {
        headers: {
          'Content-Type': file.type,
        }
      }
    );
  }
};

export default MediaResource;
