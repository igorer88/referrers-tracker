import axios from '@/config/axios';

export function ifAuthenticated(to, from, next) {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken) {
    axios
      .post('auth/check')
      .then(response => {
        console.log(response.data);
        next();
      })
      .catch(error => {
        console.error(error.response);
        this.$emit('Authenticated', false);
        //console.log(error.response.data);
        next({ name: 'Login' });
      });
  } else {
    console.log('not logged');
    next({ name: 'Login' });
  }
}
