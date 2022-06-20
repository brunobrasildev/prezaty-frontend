export default class PositionService {
  constructor(axios, auth) {
    this.http = axios;
  }
  dashboard(filters) {
    let query = '/position/dashboard?q=1';
    if (filters.tradeMode != null ) {
      query += "&tradeMode=" + filters.tradeMode
    }
    
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + filters.dateStart
      query += '&dateEnd=' + filters.dateEnd
    }
    if (filters.portfolioRefs != null && filters.portfolioRefs != '') {
      query += '&portfolioRefs=' + filters.portfolioRefs.join(',')
    }
    if (filters.setupRefs != null && filters.setupRefs != '') {
      query += '&setupRefs=' + filters.setupRefs.join(',')
    }

    return this.http.$get(query)
  }

  byFilters(filters) {
    let query = '/position/by-filters?q=1';
    if (filters.tradeMode != null ) {
      query += "&tradeMode=" + filters.tradeMode
    }
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + filters.dateStart
      query += '&dateEnd=' + filters.dateEnd
    }
    if (filters.portfolioRefs != null && filters.portfolioRefs != '') {
      query += '&portfolioRefs=' + filters.portfolioRefs.join(',')
    }
    if (filters.setupRefs != null && filters.setupRefs != '') {
      query += '&setupRefs=' + filters.setupRefs.join(',')
    }

    return this.http.$get(query)
  }

  performanceMonth(filters) {
    let query = '/position/performance-month?q=1';
    if (filters.tradeMode != null ) {
      query += "&tradeMode=" + filters.tradeMode
    }
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + filters.dateStart
      query += '&dateEnd=' + filters.dateEnd
    }
    if (filters.portfolioRefs != null && filters.portfolioRefs != '') {
      query += '&portfolioRefs=' + filters.portfolioRefs.join(',')
    }
    if (filters.setupRefs != null && filters.setupRefs != '') {
      query += '&setupRefs=' + filters.setupRefs.join(',')
    }

    return this.http.$get(query)
  }

  profits(filters) {
    let query = '/position/profits?q=1';
    if (filters.tradeMode != null ) {
      query += "&tradeMode=" + filters.tradeMode
    }
    if (filters.dateStart != null && filters.dateEnd != null) {
      query += '&dateStart=' + filters.dateStart
      query += '&dateEnd=' + filters.dateEnd
    }
    if (filters.portfolioRefs != null && filters.portfolioRefs != '') {
      query += '&portfolioRefs=' + filters.portfolioRefs.join(',')
    }
    if (filters.setupRefs != null && filters.setupRefs != '') {
      query += '&setupRefs=' + filters.setupRefs.join(',')
    }

    return this.http.$get(query)
  }
}

