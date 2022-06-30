import * as moment from  "moment-timezone"

export default class BacktestService {
  constructor(axios, auth) {
    this.http = axios
  }
  queryFilter(endpoint, filters) {
    let query = endpoint + '?q=1';
    
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + new Date(moment.tz(filters.dateStart, null).format("YYYY-MM-DD 00:00:00"))
      query += '&dateEnd=' + new Date(moment.tz(filters.dateEnd, null).format("YYYY-MM-DD 23:59:59"))
    } else {
      let start = new Date(moment.tz(new Date(), null).format("YYYY-MM-DD 00:00:00"))  
      let end = new Date(moment.tz(new Date(), null).format("YYYY-MM-DD 23:59:59"))
      query += '&dateStart=' + start
      query += '&dateEnd=' + end
    }

    if (filters.setupId != null && filters.setupId != '') {
      query += '&setupId=' + filters.setupId
    }

    return query
  }
  importHtml(values) {
    let formData = new FormData();
    formData.append('file', values.file);
    return this.http.$post('/backtest/import-html/' + values.setupId, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
  delete(id) {
    return this.http.$delete('/backtest/' + id)
  }
  deleteBySetupId(setupId) {
    return this.http.$delete('/backtest/setup/' + setupId)
  }
  byFilter(filters) {
    let query = this.queryFilter('/backtest', filters)
    return this.http.$get(query)
  }
  positionsByFilter(filters) {
    let query = this.queryFilter('/backtest/positions', filters)
    return this.http.$get(query)
  }
  performanceMonthByFilter(filters) {
    let query = this.queryFilter('/backtest/performance-month', filters)
    return this.http.$get(query)
  }
  monteCarlo(id) {
    return this.http.$get('/backtest/' + id + '/monte-carlo')
  }
  profitPeriodByFilter(filters, endpoint) {
    let query = this.queryFilter('/backtest/' + endpoint, filters)
    return this.http.$get(query)
  }
}

