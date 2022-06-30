import * as moment from  "moment-timezone"

export default class PositionService {
  constructor(axios, auth) {
    this.http = axios;
  }
  queryFilter(endpoint, filters) {
    let query = endpoint + '?q=1';
    
    if (filters.tradeMode != null ) {
      query += "&tradeMode=" + filters.tradeMode
    }
    
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + new Date(moment.tz(filters.dateStart, null).format("YYYY-MM-DD 00:00:00"))
      query += '&dateEnd=' + new Date(moment.tz(filters.dateEnd, null).format("YYYY-MM-DD 23:59:59"))
    } else {
      let start = new Date(moment.tz(new Date(), null).format("YYYY-MM-DD 00:00:00"))  
      let end = new Date(moment.tz(new Date(), null).format("YYYY-MM-DD 23:59:59"))
      query += '&dateStart=' + start
      query += '&dateEnd=' + end
    }

    if (filters.setupIds != null && filters.setupIds != '') {
      query += '&setupIds=' + filters.setupIds.join(',')
    }

    return query
  }

  dashboard(filters) {
    let query = this.queryFilter('/position/dashboard', filters);
    return this.http.$get(query)
  }

  byFilters(filters) {
    let query = this.queryFilter('/position/by-filters', filters);
    return this.http.$get(query)
  }

  performanceMonth(filters) {
    let query = this.queryFilter('/position/performance-month', filters);
    return this.http.$get(query)
  }

  profits(filters) {
    let query = this.queryFilter('/position/profits', filters);
    return this.http.$get(query)
  }
}

