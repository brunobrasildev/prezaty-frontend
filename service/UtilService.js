export default class UtilService {
  constructor(axios) {
    this.http = axios;
  }
  getAddress(postcode) {
    return this.http.$get('https://viacep.com.br/ws/' + postcode + '/json/', { headers: null })
  }
  formatRulesForm(rules) {
    _.forEach(rules, (entry) => {
      if (entry.indicadorCustomId != null) {
        entry.indicador = entry.indicadorCustom
        entry.signal = entry.signalIndicadorCustom
        entry.indicadorId = entry.indicadorCustomId
        entry.signalId = entry.signalIndicadorCustomId
        entry.indicadorType = 'CUSTOM'
        entry.indicadorTypeAndId = entry.indicadorType + '_' + entry.indicadorCustomId
        _.forEach(entry.params, (param) => {
          if (param.indicadorCustomParam != null) {
            param.param = param.indicadorCustomParam
            param.param.label = param.param.name
          }
        })
      } else {
        entry.indicadorType = 'TECHNICIAN'
        entry.indicadorTypeAndId = entry.indicadorType + '_' + entry.indicadorId
        _.forEach(entry.params, (param) => {
          let valueParam = param.value
          if (param.param.id == 29 || param.param.id == 30 || param.param.id == 31) {
            valueParam = param.value.split(',')
          }
          param.value = valueParam
        })  
      }
    })

    console.log(rules)

    return rules
  }
  formatRulesSave(rules, copy) {
    let newValues = []
      _.forEach(rules, (value) => {
        let params = []
        _.forEach(value.params, (p) => {
          let paramId = null
          if (value.indicadorType == "TECHNICIAN") {
            paramId = p.param.id
          }

          let indicadorCustomParamId = null
          if (value.indicadorType == "CUSTOM") {
            indicadorCustomParamId = p.param.id
          }

          let id = p.id
          if (copy == true) {
            id = null
          }

          let valueParam = p.value
          if (paramId == 29 || paramId == 30 || paramId == 31) {
            valueParam = p.value.join(',')
          }

          let param = {
            id: id,
            paramId: paramId,
            indicadorCustomParamId: indicadorCustomParamId,
            value: valueParam,
          }
          params.push(param)
        })

        let signalId = null
        let indicadorId = null
        if (value.indicadorType == "TECHNICIAN") {
          signalId = value.signal.id
          indicadorId = value.indicador.id
        }

        let signalIndicadorCustomId = null
        let indicadorCustomId = null
        if (value.indicadorType == "CUSTOM") {
          signalIndicadorCustomId = value.signal.id
          indicadorCustomId = value.indicador.id
        }

        let id = value.id
        if (copy == true) {
          id = null
        }

        let rule = {
          id: id,
          indicadorId: indicadorId,
          indicadorCustomId: indicadorCustomId,
          signalId: signalId,
          signalIndicadorCustomId: signalIndicadorCustomId,
          type: value.type,
          params: params,
          paramsRemove: value.paramsRemove,
        }

        newValues.push(rule)
      })

      return newValues  
  }
}

