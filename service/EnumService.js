export default class EnumService {
  constructor(axios, auth) {
    this.http = axios;
  }
  get(name) {
    return this.http.$get('/enum/' + name);
  }
}

