export default class ConfigService {
  constructor(axios, auth) {
    this.http = axios;
  }
  list() {
    return this.http.$get('/config')
  }
}

