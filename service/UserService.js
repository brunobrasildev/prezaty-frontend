export default class UserService {
  constructor(axios) {
    this.http = axios;
  }
  byId(id) {
    return this.http.$get('/user/' + id)
  }
  principal() {
    return this.http.$get('/user/principal')
  }
  register(values) {
    return this.http.$post('/user/register', values)
  }
  saveMyAccount(values) {
    return this.http.$post('/user/save-my-account', values)
  }
  forgotPassword(values) {
    return this.http.$post('/user/forgot-password', values)
  }
  resetPassword(values) {
    return this.http.$post('/user/reset-password', values)
  }
  unsubscribe(values) {
    return this.http.$post('/user/unsubscribe', values)
  }
  payment() {
    return this.http.$get('/user/payment')
  }
  pay() {
    return this.http.$get('/user/pay')
  }
}

