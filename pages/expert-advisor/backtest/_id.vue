<template>
  <div class="flex flex-col">
    <div class="my-4 p-grid">
      <div class="p-col-12 p-md-6">
        <h3 class="text-gray-700 text-xl font-medium">Backtest de {{ setup.name }}</h3>
      </div>
      <div class="p-col-12 p-md-6  flex justify-end">
        <FileUpload chooseLabel="Importar backtest (.html)" mode="basic" name="file" :auto="true" :url="urlUpload" accept=".html" @before-send="beforeUpload" @error="errorImport" @upload="importBacktest" />
        <Button v-if="backtest != null" @click="deleteBacktest()" class="p-button-raised p-button-warning ml-6" label="Deletar" />
      </div>
    </div>

    <div v-if="backtest != null" class="mx-auto w-full">
      <TabView>
        <TabPanel>
          <template #header>
            <span>Métricas</span>
          </template>
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
                    {{ backtest.totalPositions }} posições 
                  </p>
                </div>              
              </div>
            </div>
          </div>

          <div v-if="backtest != null" class="my-2 sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                    <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Ganhos na Compra</th>
                    <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Perdas na Compra</th>
                    <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Ganhos na Venda</th>
                    <th class="border border-gray-300 p-1 lg:text-center lg:w-1/5">Total Perdas na Venda</th>
                  </tr>
                </thead>
                <tbody class="flex-1 sm:flex-none">
                  <tr class="flex flex-col flex-no wrap sm:table-row">
                    <td class="border border-gray-300 lg:text-center p-1">{{ backtest.stagnationDays }} dia(s)</td>
                    <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyLongGain }}</td>
                    <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyLongLoss }}</td>
                    <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyShortGain }}</td>
                    <td class="border border-gray-300 lg:text-center p-1">{{ backtest.qtyShortLoss }}</td>
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
        </TabPanel>
        <TabPanel>
          <template #header>
            <span @click="showBalanceEvolution()">Evolução Capital</span>
          </template>
          <div v-if="lineSeriesBalance.length > 0" class="my-2 sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
                <h2 class="text-lg mb-4 font-semibold">Evolução do Capital</h2>
                <apexchart height="350" type="line" :options="lineOptionsBalance" :series="lineSeriesBalance"></apexchart>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span @click="showMonthPerformance()">Perfomance Mensal</span>
          </template>
          <div v-if="backtestPerformanceMonth.length > 0" class="my-2 sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <h2 class="text-lg mb-4 font-semibold">Perfomance Mensal</h2>
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
        </TabPanel>
        <TabPanel>
          <template #header>
            <span @click="showMonteCarlo()">Monte Carlo</span>
          </template>
          <div v-if="monteCarlo != null" class="my-2 sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
                <h2 class="text-lg mb-4 font-semibold">Monte Carlo</h2>
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
        </TabPanel>
      </TabView>


      <Dialog header="Rendimentos" :style="{ width: '80%' }" :visible.sync="displayYield" :modal="true">
        <div class="h-80">
          <table class="w-full flex flex-row flex-no-wrap overflow-hidden text-xs">
            <thead>
              <tr class="font-bold uppercase bg-gray-200 text-gray-600 flex flex-col flex-no wrap sm:table-row ">
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Período</th>
                <th class="border border-gray-300 p-1 lg:text-center lg:w-1/4">Rendimento</th>
              </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
              <tr v-for="row in profitsPeriod" :key="row.period" class="flex flex-col flex-no wrap sm:table-row">
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  {{ row.period }}    
                </td>
                <td class="border border-gray-300 lg:text-center p-1 lg:w-1/4">
                  <span :class="row.profit >= 0 ? 'text-gray-800' : 'text-red-600 font-semibold'">{{ row.profit | money(settingCurrency.value) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import SetupService from "~/service/SetupService.js"
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
      setup: {name: null},
      backtest: null,
      backtestPositions: [],
      backtestPerformanceMonth: [],
      monteCarlo: null,
      settingCurrency: {value:'BRL'},
      lineOptionsBalance: {},
      lineOptionsMonteCarlo: {},
      lineSeriesBalance: [],
      lineSeriesMonteCarlo: [],
      years: [],
      profitsPeriod: [],
      displayYield: false
    }
  },
  head() {
      return {
        title: "Prezaty | Backtest"  
      }
  },
  setupService: null,
  backtestService: null,
  created() {
    this.setupService = new SetupService(this.$axios, this.$auth)
    this.backtestService = new BacktestService(this.$axios, this.$auth)
  },
  mounted() {
    this.getSetup(this.id)
    this.getBacktest(this.id)
  },
  methods: {
    cleanBacktest() {
      this.backtest = null
      this.backtestPositions = []
      this.backtestPerformanceMonth = []
      this.monteCarlo = null
      this.lineOptionsBalance = {}
      this.lineOptionsMonteCarlo = {}
      this.lineSeriesBalance = []
      this.lineSeriesMonteCarlo = []
      this.years = []
    },
    beforeUpload(request) {
      this.$nuxt.$loading.start()
      request.xhr.setRequestHeader('Authorization', this.$auth.getToken('local'))
      
      return request;
    },
    importBacktest(event) {
      this.cleanBacktest()
      let response = JSON.parse(event.xhr.response)      
      this.backtest = response
      this.$nuxt.$loading.finish()
    },
    errorImport(event) {
      let response = JSON.parse(event.xhr.response)
      this.$toast.add({ severity: "error", detail: response.message, life: 3000 })
      this.$nuxt.$loading.finish()
    },
    async getSetup(id) {
      let response = await this.setupService.byId(id)
      this.setup = response
    },
    async yieldPeriod(endpoint) {
      let response = await this.backtestService.profitPeriodBySetupId(this.id, endpoint)
      this.profitsPeriod = response
      this.displayYield = true
    },
    closeDisplayYield() {
      this.displayYield = false
      this.profitsPeriod = []
    },
    async getBacktest(id) {
      let response = await this.backtestService.bySetupId(id)
      if (response) {
        this.backtest = response
      }
    },
    async getBacktestPositions(id) {
      let response = await this.backtestService.positionsBySetupId(id)
      if (response) {
        this.backtestPositions = response.positions
        this.chartBalance()
      }
    },
    async getBacktestPerformanceMonth(id) {
      let response = await this.backtestService.performanceMonthBySetupId(id)
      if (response) {
        this.backtestPerformanceMonth = response.performanceMonth
      }
    },
    async getMonteCarlo(backtestId) {
      let response = await this.backtestService.monteCarlo(backtestId)
      this.monteCarlo = response
      this.chartMonteCarlo()
    },
    async deleteBacktest() {
      let response = await this.backtestService.deleteBySetupId(this.id)
      this.cleanBacktest()
    },
    categoriesBalance(positions) {
      let categories = []

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
    showBalanceEvolution() {
      if (this.lineSeriesBalance.length == 0)
        this.getBacktestPositions(this.id)
    },
    showMonthPerformance() {
      if (this.backtestPerformanceMonth.length == 0)
        this.getBacktestPerformanceMonth(this.id)
    },
    showMonteCarlo() {
      if (this.monteCarlo == null)
        this.getMonteCarlo(this.backtest.id)
    },
    chartBalance() {
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
      this.lineSeriesBalance = [{
        name: 'Capital',
        data: this.seriesBalance(this.backtestPositions)
      }]    
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
