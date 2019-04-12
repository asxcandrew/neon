import { BaseResource } from './base';

class AuthResource extends BaseResource {
  login(email, password){
    const url = `/${this.base}/login`;

    return this.api.$post(url, {email: email, password: password});
  };
  register(email, username, password){
    const url = `/${this.base}/register`;
  
    return this.api.$post(url,
      {
        email: email,
        password: password,
        username: username
      }
    );
  };
};

export default AuthResource;
