import { Client } from '~/common/api';

async function usernameUniqness(value, vm){
  let available = false;

  await Client.User.with(vm.$axios).get(value).then((res) => {}).catch((error) => {
    if (error.response.status == 404){
      available = true
    }
  });
  return available;
};

export { usernameUniqness }
