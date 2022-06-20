export default class SiteService {
  constructor(axios, auth) {
    this.http = axios;
  }
  yesNo() {
    return this.http.$get('/site/yes-no')
  }
  currency() {
    return this.http.$get('/site/currency')
  }
  timeframe() {
    return this.http.$get('/site/timeframe')
  }
  timeframeById(id) {
    return this.http.$get('/site/timeframe/' + id)
  }
  indicador() {
    return this.http.$get('/site/indicador')
  }
  signals() {
    return this.http.$get('/site/signals')
  }
  indicadorById(id) {
    return this.http.$get('/site/indicador/' + id)
  }
  signalById(id) {
    return this.http.$get('/site/signal/' + id)
  }
  signalIndicadorCustomById(id) {
    return this.http.$get('/site/signal-indicador-custom/' + id)
  }
  signal(indicadorId) {
    return this.http.$get('/site/indicador/' + indicadorId + '/signal')
  }
  signalRelation(signalId) {
    return this.http.$get('/site/signal/' + signalId + '/signal-relation')
  }
  param(indicadorId) {
    return this.http.$get('/site/indicador/' + indicadorId + '/param')
  }
}

