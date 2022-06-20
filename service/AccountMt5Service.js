export default class AccountMt5Service {
  constructor(axios, auth) {
    this.http = axios;
  }
  save(values) {
    if (values.id == null || values.id == '') {
      return this.http.$post('/account-mt5', values)
    } else {
      return this.http.$put('/account-mt5/' + values.id, values)
    }  
  }
  all() {
    return this.http.$get('/account-mt5')
  }
  byId(id) {
    return this.http.$get('/account-mt5/' + id)
  }
  delete(id) {
    return this.http.$delete('/account-mt5/' + id)
  }
  testConnection(values) {
    return this.http.$post('/account-mt5/test-connection', values)
  }
}

