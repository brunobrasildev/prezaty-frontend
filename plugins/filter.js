import Vue from 'vue'
import * as numeral  from  "numeral"
import * as moment from  "moment-timezone"

Vue.filter('money', (val, agr1) => {
  let format = val.toLocaleString('pt-BR', { style: 'currency', currency: agr1 })
  
  if (agr1 == 'USD') {
    format = val.toLocaleString('EN', { style: 'currency', currency: agr1 })
  }

  return format
})

Vue.filter('float', val => {
  let format = numeral(val).format("0.00")
  return format
})

Vue.filter('date', val => {
  let format = moment.tz(val, null).format('DD/MM/YYYY')
  return format
})

Vue.filter('datetime', val => {
  let format = moment.tz(val, null).format('DD/MM/YYYY HH:mm:ss')
  return format
})