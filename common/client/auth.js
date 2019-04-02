import { BaseResource } from './base';

class AuthResource extends BaseResource {
  login(email, password){
    const url = `/${this.base}/login`;
    console.log("send req")
    return this.api.$post(url, {email: email, password: password});
  };
  register(){
    const url = `/${this.base}/register`;
    return this.api.$post(url, options);
  };
};

export default AuthResource;
