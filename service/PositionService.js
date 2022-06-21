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
      query += '&dateStart=' + filters.dateStart
      query += '&dateEnd=' + filters.dateEnd
    } else {
      let start = moment.tz(new Date(), null).format("YYYY-MM-DD 00:00:00")  
      let end = moment.tz(new Date(), null).format("YYYY-MM-DD 23:59:59")
      query += '&dateStart=' + start
      query += '&dateEnd=' + end
    }

    if (filters.portfolioIds != null && filters.portfolioIds != '') {
      query += '&portfolioIds=' + filters.portfolioIds.join(',')
    }
    if (filters.setupIds != null && filters.setupIds != '') {
      query += '&setupIds=' + filters.setupIds.join(',')
    }  
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

