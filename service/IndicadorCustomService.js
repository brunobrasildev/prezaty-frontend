export default class IndicadorCustomService {
  constructor(axios, auth) {
    this.http = axios;
  }
  save(values) {
    if (values.id == null || values.id == '') {
      return this.http.$post('/custom-indicador', values)
    } else {
      return this.http.$put('/custom-indicador/' + values.id, values)
    }  
  }
  all() {
    return this.http.$get('/custom-indicador')
  }
  byId(id) {
    return this.http.$get('/custom-indicador/' + id)
  }
  delete(id) {
    return this.http.$delete('/custom-indicador/' + id)
  }
  signals() {
    return this.http.$get('/custom-indicador/signals')
  }
  
}

