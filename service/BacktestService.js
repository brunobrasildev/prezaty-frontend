export default class BacktestService {
  constructor(axios, auth) {
    this.http = axios
  }
  importHtml(values) {
    let formData = new FormData();
    formData.append('file', values.file);
    return this.http.$post('/backtest/import-html/' + values.setupId, formData, { headers: { tid: this.tid, 'Content-Type': 'multipart/form-data' } })
  }
  bySetupRef(ref) {
    return this.http.$get('/backtest/setup/' + ref)
  }
  positionsBySetupRef(ref) {
    return this.http.$get('/backtest/setup/' + ref + '/positions')
  }
  performanceMonthBySetupRef(ref) {
    return this.http.$get('/backtest/setup/' + ref + '/performance-month')
  }
  byPortfolioId(portfolioId) {
    return this.http.$get('/backtest/portfolio/' + portfolioId)
  }
  positionsByPortfolioId(portfolioId) {
    return this.http.$get('/backtest/portfolio/' + portfolioId + '/positions')
  }
  performanceMonthByPortfolioId(portfolioId) {
    return this.http.$get('/backtest/portfolio/' + portfolioId + '/performance-month')
  }
  profitsByPortfolioId(portfolioId) {
    return this.http.$get('/backtest/portfolio/' + portfolioId + '/profits')
  }
  monteCarlo(id) {
    return this.http.$get('/backtest/' + id + '/monte-carlo')
  }
  monteCarloPortfolio(portfolioId) {
    return this.http.$get('/backtest/monte-carlo/portfolio/' + portfolioId)
  }
}

