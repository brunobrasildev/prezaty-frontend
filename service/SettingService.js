export default class SettingService {
  constructor(axios, auth) {
    this.http = axios;
  }
  saveAll(values) {
    return this.http.$post('/setting/all', values)
  }
  all() {
    return this.http.$get('/setting')
  }
  get(id) {
    return this.http.$get('/setting/' + id)
  }
}

