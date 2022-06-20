export default class SetupService {
  constructor(axios, auth) {
    this.http = axios;
  }
  save(values) {
    if (values.id == null || values.id == '') {
      return this.http.$post('/setup', values)
    } else {
      return this.http.$put('/setup/' + values.id, values)
    }  
  }
  all() {
    return this.http.$get('/setup')
  }
  byId(id) {
    return this.http.$get('/setup/' + id)
  }
  delete(id) {
    return this.http.$delete('/setup/' + id)
  }
}

