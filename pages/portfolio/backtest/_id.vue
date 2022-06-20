<template>
  <div class="flex flex-col">
    <Message v-if="$auth.user.status.value != 'ACTIVE'" severity="warn" :closable="false">Ao assinar o plano na plataforma você poderá criar robôs ilimitados com todos os recursos. <nuxt-link class="text-blue-600" to="/payment">Clique aqui</nuxt-link> para assinar o plano.</Message>
    <div class="my-4 grid grid-cols-12">
      <div class="col-span-6">
        <h3 class="text-gray-700 text-xl font-medium">Backtest do Portfólio {{ this.portfolioName }}</h3>
      </div>
    </div>

    <div v-if="backtest != null" class="mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">LUCRO</h5>
                    <span class="font-semibold text-xl text-green-700" v-if="backtest.profit > 0">{{ backtest.profit | money(settingCurrency.value) }}</span>
                    <span class="font-semibold text-xl text-red-700" v-if="backtest.profit <= 0">{{ backtest.profit | money(settingCurrency.value) }}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">
                  <span class="mr-2 text-green-500" v-if="backtest.profitPercent > 0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 float-left" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    {{ backtest.profitPercent | float }}% </span>
                  <span class="mr-2 text-red-500" v-if="backtest.profitPercent <= 0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 float-left" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg> 
                    {{ backtest.profitPercent | float }}% </span>
                  <span class="whitespace-nowrap">do deposito</span>
                </p>
              </div>              
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">FATOR LUCRO</h5>
                    <span class="font-semibold text-xl">{{ backtest.profitFactor | float }}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">
                  <span class="mr-2 text-green-500">
                    {{ backtest.grossProfit | money(settingCurrency.value) }} ganho bruto
                  </span><br>
                  <span class="mr-2 text-red-500">
                    {{ backtest.grossLoss | money(settingCurrency.value) }} perda bruta 
                  </span>
                </p>
              </div>              
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">DRAWDOWN</h5>
                    <span class="font-semibold text-xl">{{ backtest.drawdownValue |  money(settingCurrency.value) }}</span>
                  </div>
                </div>
                <p class="text-s mt-4">
                  <span class="mr-2">
                    {{ backtest.drawdownPercent | float }}% 
                  </span>
                </p>
              </div>              
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">ASSERTIVIDADE</h5>
                    <span class="font-semibold text-xl">{{ backtest.assertivenessPercent | float }}%</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">
                  <span class="mr-2 text-green-500">
                    {{ backtest.qtyGain }} ganho(s) 
                  </span>
                  <span class="mr-2 text-red-500">
                    {{ backtest.qtyLoss }} perda(s) 
                  </span>
                </p>
                <p class="text-sm text-gray-600 mt-4">
                  {{ backtestPositions.length }} posições 
                </p>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="backtest != null" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Fator de Recuperação</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Payoff</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant. Compras</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant. Vendas</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Máximo Ganho na Posição</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.recoveryFactor | float }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.payoff | float }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.longPositions }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.shortPositions }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.maxGain | money(settingCurrency.value) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Ganhos Consecutivos</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Perdas Consecutivas</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant. Ganhos</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant. Perdas</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Máximo de Perda na Posição</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.consecutiveGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.consecutiveLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.maxLoss | money(settingCurrency.value) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant Max Posições por Dia</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant Max Ganhos por Dia</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Quant Max Perdas por Dia</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Máximo de ganho por Dia</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Máximo de perda por Dia</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyMaxPositionDay }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyMaxPositionDayGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyMaxPositionDayLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.maxDayGain | money(settingCurrency.value) }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.maxDayLoss | money(settingCurrency.value) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Dias de Estagnação</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5"></th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5"></th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5"></th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5"></th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1">{{ backtest.stagnationDays }} dia(s)</td>
                <td class="border border-gray-300 lg:text-center p-1"></td>
                <td class="border border-gray-300 lg:text-center p-1"></td>
                <td class="border border-gray-300 lg:text-center p-1"></td>
                <td class="border border-gray-300 lg:text-center p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="backtest != null" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 class="text-3x2">Evolução do Capital</h2>
          <apexchart height="350" type="line" :options="lineOptionsBalance" :series="lineSeriesBalance"></apexchart>
        </div>
      </div>
    </div>

    <div v-if="backtestPerformanceMonth.length > 0" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 class="text-3x2">Perfomance Mensal</h2>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr v-for="(performance, index) in backtestPerformanceMonth" :key="index" class="font-bold text-left uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1">Ano</th>
                <th class="border border-gray-300 p-1">Janeiro</th>
                <th class="border border-gray-300 p-1">Fevereiro</th>
                <th class="border border-gray-300 p-1">Março</th>
                <th class="border border-gray-300 p-1">Abril</th>
                <th class="border border-gray-300 p-1">Maio</th>
                <th class="border border-gray-300 p-1">Junho</th>
                <th class="border border-gray-300 p-1">Julho</th>
                <th class="border border-gray-300 p-1">Agosto</th>
                <th class="border border-gray-300 p-1">Setembro</th>
                <th class="border border-gray-300 p-1">Outubro</th>
                <th class="border border-gray-300 p-1">Novembro</th>
                <th class="border border-gray-300 p-1">Dezembro</th>
                <th class="border border-gray-300 p-1">Rendimento</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr v-for="(performance, index) in backtestPerformanceMonth" :key="index" class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 p-1 font-semibold" scope="row">{{ performance.year }}</td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.jan >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.jan | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.fev >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.fev | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.mar >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.mar | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.abr >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.abr | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.mai >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.mai | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.jun >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.jun | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.jul >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.jul | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.ago >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.ago | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.set >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.set | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.out >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.out | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.nov >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.nov | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.dez >= 0 ? 'text-gray-800' : 'text-red-800'">{{ performance.dez | money(settingCurrency.value) }}</span>
                </td>
                <td class="border border-gray-300 p-1">
                  <span :class="performance.profitValue >= 0 ? 'text-green-800 font-bold' : 'text-red-800 font-bold'">{{ performance.profitValue | money(settingCurrency.value) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="monteCarlo != null" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 class="text-3x2">Monte Carlo</h2>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Melhor Resultado</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Pior Resultado</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Médias dos Resultados</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">% Lucro das Simulações</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  <span :class="monteCarlo.bestResult >= 0 ? 'text-gray-800' : 'text-red-800'">{{ monteCarlo.bestResult | money(settingCurrency.value) }}</span>  
                </td>
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  <span :class="monteCarlo.worstResult >= 0 ? 'text-gray-800' : 'text-red-800'">{{ monteCarlo.worstResult | money(settingCurrency.value) }}</span>  
                </td>
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  <span :class="monteCarlo.medianResult >= 0 ? 'text-gray-800' : 'text-red-800'">{{ monteCarlo.medianResult | money(settingCurrency.value) }}</span>  
                </td>
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  <span :class="monteCarlo.percentResult >= 0 ? 'text-gray-800' : 'text-red-800'">{{ monteCarlo.percentResult | float }}%</span>  
                </td>
              </tr>
            </tbody>
          </table>
          <apexchart height="350" type="line" :options="lineOptionsMonteCarlo" :series="lineSeriesMonteCarlo"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioService from "~/service/PortfolioService.js"
import SettingService from "~/service/SettingService.js"
import BacktestService from "~/service/BacktestService.js"
import _ from "lodash"
import * as moment from  "moment-timezone"
import * as numeral  from  "numeral"

export default {
  middleware: "auth",
  layout: "app",
  async asyncData({ params, error }) {
    return {
      id: params.id,
      fileBacktest: [],
      urlUpload: process.env.BASE_API_URL + '/backtest/import-html/' + params.id,
      backtest: null,
      backtestPositions: [],
      backtestPerformanceMonth: [],
      backtestProfits: [],
      portfolio: null,
      portfolioName: null,
      monteCarlo: null,
      settingCurrency: {value:'BRL'},
      lineOptionsBalance: {},
      lineOptionsMonteCarlo: {},
      lineSeriesBalance: [],
      lineSeriesMonteCarlo: [],
      years: []
    }
  },
  head() {
      return {
        title: "Prezaty | Backtest"  
      }
  },
  portfolioService: null,
  backtestService: null,
  settingService: null,
  created() {
    this.portfolioService = new PortfolioService(this.$axios, this.$auth)
    this.backtestService = new BacktestService(this.$axios, this.$auth)
    this.settingService = new SettingService(this.$axios, this.$auth)
  },
  mounted() {
    this.getPortfolio(this.id)
    this.getBacktest(this.id)
    this.getBacktestPositions(this.id)
    this.getBacktestPerformanceMonth(this.id)
    this.getBacktestProfits(this.id)
    this.settings();
  },
  methods: {
    async getPortfolio(portfolioId) {
      let response = await this.portfolioService.byId(portfolioId)
      this.portfolio = response
      this.portfolioName = this.portfolio.name
    },
    async getBacktest(portfolioId) {
      let response = await this.backtestService.byPortfolioId(portfolioId)
      this.backtest = response
      this.getMonteCarlo(portfolioId)
    },
    async getBacktestPositions(portfolioId) {
      let response = await this.backtestService.positionsByPortfolioId(portfolioId)
      this.backtestPositions = response.positions
    },
    async getBacktestPerformanceMonth(portfolioId) {
      let response = await this.backtestService.performanceMonthByPortfolioId(portfolioId)
      this.backtestPerformanceMonth = response.performanceMonth
    },
    async getBacktestProfits(portfolioId) {
      let response = await this.backtestService.profitsByPortfolioId(portfolioId)
      this.backtestProfits = response.profits
      this.chartBalance()
    },
    async getMonteCarlo(backtestId) {
      let response = await this.backtestService.monteCarloPortfolio(backtestId)
      this.monteCarlo = response
      this.chartMonteCarlo()
    },
    async settings() {
      this.settingCurrency = await this.settingService.get("currency")
    },
    categoriesBalance(positions) {
      let categories = [];

      _.forEach(positions, (value) => {
        let closeTime = new Date(moment.tz(value.closeTime, null).format("YYYY-MM-DD"))
        categories.push(closeTime)  
      });

      return categories
    },
    categoriesMonteCarlo(prices) {
      let categories = [];
      let i = 1;
      _.forEach(prices[0].prices, (price) => {
        categories.push(i)  
        i++;
      });

      return categories
    },
    seriesBalance(positions) {
      let series = []
      let totalBalance = 0
      _.forEach(positions, (value) => {
        totalBalance += value.profit
        series.push(numeral(totalBalance).format('0.00'))
      })

      return series
    },
    seriesMonteCarlo(prices) {
      let series = []
      let balance = 0;
      _.forEach(prices, (price) => {
        balance += price
        series.push(numeral(balance).format('0.00'))
      })
      return series
    },
    chartBalance() {
      let series = []

      _.forEach(this.backtestProfits, (p) => {
        series.push({
          name: p[0].setupName,
          data: this.seriesBalance(p)
        })  
      })

      series.push({
        name: 'Portfólio',
        data: this.seriesBalance(this.backtestPositions)
      })

      console.log(series)

      this.lineOptionsBalance = {
        chart: {
          id: 'chart-balance'
        },
        xaxis: {
          categories: this.categoriesBalance(this.backtestPositions),
          labels: {
            formatter: function(val) {
              return moment.tz(val, null).format('DD/MM/YYYY')
            }
          }
        },
        stroke: {
          width: 2
        }
      }
      this.lineSeriesBalance = series    
    },
    chartMonteCarlo() {
      let categories = this.categoriesMonteCarlo(this.monteCarlo.pricesList)
      
      this.lineOptionsMonteCarlo = {
        chart: {
          id: 'chart-montecarlo',
          animations: { enabled: false },
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        xaxis: {
          categories: categories,
          labels: {
            show: false,
          }  
        },
        stroke: {
          width: 1
        },
        legend: {
          show: false,
        },
        tooltip: {
          enabled: false,
        }  
      }
      
      this.lineSeriesMonteCarlo = []
      _.forEach(this.monteCarlo.pricesList, (value, key) => {
        let data = {
          name: 'Simulação - ' + (key + 1),
          data: this.seriesMonteCarlo(value.prices)
        }
        this.lineSeriesMonteCarlo.push(data)
      })
    }
  }  
}
</script>
