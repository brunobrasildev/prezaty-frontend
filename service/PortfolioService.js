export default class PortfolioService {
  constructor(axios, auth) {
    this.http = axios;
  }
  save(values) {
    if (values.id == null || values.id == '') {
      return this.http.$post('/portfolio', values)
    } else {
      return this.http.$put('/portfolio/' + values.id, values)
    }  
  }
  all() {
    return this.http.$get('/portfolio')
  }
  byId(id) {
    return this.http.$get('/portfolio/' + id)
  }
  delete(id) {
    return this.http.$delete('/portfolio/' + id)
  }
}

