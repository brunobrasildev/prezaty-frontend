import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import * as rules from "vee-validate/dist/rules";
import { localize } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR.json';
import VueI18n from "vue-i18n";
import * as moment from  "moment-timezone";

Vue.use(VueI18n);

localize({pt_BR});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: pt_BR.messages[rule] // assign message
    // message: (_, values) => i18n.t("validation." + rules[rule], values)
  });
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'A senha e confirmação da senha deve ser igual.'
});

extend('is_date', {
  validate(value) {
    let date = moment(value, 'DD/MM/YYYY');
    return date.isValid();
  },
  message: 'Data com o formato errado. Ex: Dia/Mês/Ano'
});

extend('is_time', {
  validate(value) {
    let time = moment(value, 'h:mm');
    return time.isValid();
  },
  message: 'Digite um horário válido.'
});

extend('greater_than_zero', {
  validate(value) {
    return value > 0;
  },
  message: 'Digite valor maior que zero.'
});

extend('less_than_zero', {
  validate(value) {
    return value < 0;
  },
  message: 'Digite valor menor que zero.'
});

extend('is_bigger', {
  params: ['target'],
  validate(value, { target }) {
    let dateValue = moment(value, 'DD/MM/YYYY');
    let dateTarget = moment(target, 'DD/MM/YYYY');
    return dateValue > dateTarget;
  },
  message: 'A data tem que ser maior do que a inícial.'
});

extend('is_bigger_time_entry', {
  params: ['target'],
  validate(value, { target }) {
    let timeValue = moment(value, 'h:mm');
    let timeTarget = moment(target, 'h:mm');
    return timeValue > timeTarget;
  },
  message: 'O horário final da entrada deve ser maior do que a inícial.'
});

extend('is_bigger_time_close', {
  params: ['target'],
  validate(value, { target }) {
    let timeValue = moment(value, 'h:mm');
    let timeTarget = moment(target, 'h:mm');
    return timeValue > timeTarget;
  },
  message: 'O horário fechamento deve ser maior do que horário final.'
});

extend('cnpj', {
  validate(value) {
    cnpj = value;
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;  
  },
  message: 'O CNPJ está inválido.'
});

extend('cpf', {
  validate(value) {
    if (typeof value !== "string") return false
    var cpf = value.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true  
  },
  message: 'O CPF está inválido.'
});

Vue.config.productionTip = false;

