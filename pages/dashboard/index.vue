<template>
  <div class="flex flex-col">
    <div class="my-4 p-grid">
      <div class="p-col-12 p-md-3">
        <h3 class="text-gray-700 text-xl font-medium">Dashboard</h3>
      </div>
      <div class="p-col-12 p-md-9 justify-end">
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field p-col-12 p-md-3">
            <Dropdown @change="getPosition" v-model="filter.tradeMode" :options="tradeModes" optionLabel="text" optionValue="value" placeholder="Ambiente" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <Calendar @input="getPosition" placeholder="Data Inícial" :locale="pt_BR" dateFormat="dd/mm/yy" v-model="filter.dateStart" :manualInput="false" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <Calendar @input="getPosition" placeholder="Data Final" :locale="pt_BR" dateFormat="dd/mm/yy" v-model="filter.dateEnd" :manualInput="false" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <MultiSelect  @change="getPosition" v-model="filter.setupIds" :options="setups" optionLabel="name" optionValue="id" placeholder="Robôs" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="dashboard != null" class="mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">LUCRO</h5>
                    <span class="font-semibold text-3xl text-green-700" v-if="dashboard.profit > 0">{{ dashboard.profit | money(settingCurrency.value) }}</span>
                    <span class="font-semibold text-3xl text-red-700" v-if="dashboard.profit <= 0">{{ dashboard.profit | money(settingCurrency.value) }}</span>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">FATOR LUCRO</h5>
                    <span class="font-semibold text-xl">{{ dashboard.profitFactor | float }}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">
                  <span class="mr-2 text-green-500">
                    {{ dashboard.grossProfit | money(settingCurrency.value) }} ganho bruto
                  </span><br>
                  <span class="mr-2 text-red-500">
                    {{ dashboard.grossLoss | money(settingCurrency.value) }} perda bruta 
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
                    <span class="font-semibold text-3xl">{{ dashboard.drawdownValue |  money(settingCurrency.value) }}</span>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="h-36 relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-600 uppercase font-bold text-xs">ASSERTIVIDADE</h5>
                    <span class="font-semibold text-xl">{{ dashboard.assertivenessPercent | float }}%</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">
                  <span class="mr-2 text-green-500">
                    {{ dashboard.qtyGain }} ganho(s) 
                  </span>
                  <span class="mr-2 text-red-500">
                    {{ dashboard.qtyLoss }} perda(s) 
                  </span>
                </p>
                <p class="text-sm text-gray-600 mt-4">
                  {{ positions.length }} posições 
                </p>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="dashboard != null" class="my-2 sm:-mx-6 lg:-mx-8">
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
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.recoveryFactor | float }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.payoff | float }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.longPositions }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.shortPositions }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.maxGain | money(settingCurrency.value) }}</td>
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
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.consecutiveGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.consecutiveLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.maxLoss | money(settingCurrency.value) }}</td>
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
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyMaxPositionDay }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyMaxPositionDayGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyMaxPositionDayLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.maxDayGain | money(settingCurrency.value) }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.maxDayLoss | money(settingCurrency.value) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Dias de Estagnação</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Ganhos na Compra</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Perdas na Compra</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Ganhos na Venda</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Perdas na Venda</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.stagnationDays }} dia(s)</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyLongGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyLongLoss }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyShortGain }}</td>
                <td class="border border-gray-300 lg:text-center p-1">{{ dashboard.qtyShortLoss }}</td>
              </tr>
            </tbody>
          </table>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Rendimentos por Dia</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Rendimentos dia Mês</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Rendimentos dia Semana</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Rendimentos mês</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5"></th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1"><Button @click="yieldPeriod('profit-for-date')" label="Abrir" class="p-button-link" /></td>
                <td class="border border-gray-300 lg:text-center p-1"><Button @click="yieldPeriod('profit-group-day')" label="Abrir" class="p-button-link" /></td>
                <td class="border border-gray-300 lg:text-center p-1"><Button @click="yieldPeriod('profit-group-week-day')" label="Abrir" class="p-button-link" /></td>
                <td class="border border-gray-300 lg:text-center p-1"><Button @click="yieldPeriod('profit-group-month')" label="Abrir" class="p-button-link" /></td>
                <td class="border border-gray-300 lg:text-center p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="dashboard != null" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 class="text-lg mb-4 font-semibold">Rendimento</h2>
          <GChart
            type="LineChart"
            :data="chartBalanceData"
            :options="chartBalanceOptions"
          />
        </div>
      </div>
    </div>

    <div v-if="dashboard != null" class="my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 class="text-lg mb-4 font-semibold">Perfomance Mensal</h2>
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr v-for="(performance, index) in performanceMonth" :key="index" class="font-bold text-left uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
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
              <tr v-for="(performance, index) in performanceMonth" :key="index" class="flex flex-col flex-no wrap sm:table-row">
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

    <Dialog header="Rendimentos" :style="{ width: '80%' }" :visible.sync="displayYield" :modal="true">
      <div class="h-80">
        <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
          <thead>
            <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
              <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Período</th>
              <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Posições</th>
              <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Rendimento</th>
              <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Saldo</th>
            </tr>
          </thead>
          <tbody class="flex-1 sm:flex-none">
            <tr v-for="row in profitsPeriod" :key="row.period" class="flex flex-col flex-no wrap sm:table-row">
              <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                {{ row.period }}    
              </td>
              <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                {{ row.totalPositions }}    
              </td>
              <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                <span :class="row.profit >= 0 ? 'text-gray-800' : 'text-red-600 font-semibold'">{{ row.profit | money(settingCurrency.value) }}</span>
              </td>
              <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                <span v-if="row.balance != null">{{ row.balance | money(settingCurrency.value) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>   
  </div>
</template>

<script>
import PositionService from "~/service/PositionService.js"
import SetupService from "~/service/SetupService.js"
import EnumService from "~/service/EnumService.js"
import _ from "lodash"
import * as moment from  "moment-timezone"
import * as numeral  from  "numeral"

export default {
  middleware: "auth",
  layout: "app",
  data() {
    return {
      dashboard: null,
      positions: [],
      performanceMonth: [],
      profits: [],
      setups: [],
      tradeModes: [],
      settingCurrency: {value:'BRL'},
      years: [],
      pt_BR: process.env.PT_BR.CALENDAR,
      profitsPeriod: [],
      displayYield: false,
      filter: {
        tradeMode: 'REAL',
        setupIds: [],
        dateStart: null,
        dateEnd: null
      },
      chartBalanceData: [],
      chartBalanceOptions: {
        width: 1200,
        height: 400,
      }
    }
  },
  head() {
      return {
        title: "Prezaty | Dashboard"  
      }
  },
  positionService: null,
  setupService: null,
  enumService: null,
  created() {
    this.positionService = new PositionService(this.$axios, this.$auth)
    this.setupService = new SetupService(this.$axios, this.$auth)
    this.enumService = new EnumService(this.$axios, this.$auth)
  },
  mounted() {
    if (this.$route.query.tradeMode) {
      this.filter.tradeMode.push(this.$route.query.tradeMode)  
    }
    
    if (this.$route.query.setupIds) {
      this.filter.setupIds.push(this.$route.query.setupIds)  
    }

    this.getPosition()
    this.getSetupList()  
    this.tradeModeList()    
  },
  methods: {
    openConfig() {
      this.$router.push('/setting')  
    },
    async getPosition() {
      this.cleanDash()

      if ((this.filter.dateStart == null && this.filter.dateEnd == null) || (this.filter.dateStart != null && this.filter.dateEnd != null)) {        
        let filters = _.clone(this.filter)
        this.dashboard = await this.positionService.dashboard(filters)

        if (this.dashboard == '') {
            this.cleanDash()
        } else {
            this.positions = await this.positionService.byFilters(filters)
            this.performanceMonth = await this.positionService.performanceMonth(filters)
            this.profits = await this.positionService.profits(filters)
            this.dataBalance(this.positions)
        }    
      }
    },
    async tradeModeList() {
      let response = await this.enumService.get('trade-mode')
      this.tradeModes = response
    },
    async getSetupList() {
      let response = await this.setupService.all()
      this.setups = response
    },
    async yieldPeriod(endpoint) {
      let filters = _.clone(this.filter)
      let response = await this.positionService.profitPeriodByFilters(filters, endpoint)
      this.profitsPeriod = response
      this.displayYield = true
    },
    closeDisplayYield() {
      this.displayYield = false
      this.profitsPeriod = []
    },
    cleanDash() {
      this.dashboard = null
      this.positions = []
      this.performanceMonth = []
      this.profits = []
      this.years = []     
    },
    dataBalance(positions) {
      let i = 1;
      this.chartBalanceData.push(["Posição","Rendimento"]);
      let balance = 0
      _.forEach(positions, (value) => {
        balance += value.profit
        this.chartBalanceData.push([i, balance])
        i++  
      });
    }    
  }  
}
</script>

<style>
  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  .p-datatable-responsive .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}
</style>
