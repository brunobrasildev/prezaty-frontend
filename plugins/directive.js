import Vue from 'vue';

Vue.directive("uppercase", {
  update: function (el) {
    el.value = el.value.toUpperCase()
  }
})

Vue.directive("lowercase", {
  update: function (el) {
    el.value = el.value.toLowerCase()
  }
})

Vue.directive("lowercase-trim", {
  update: function (el) {
    el.value = el.value.toLowerCase().trim()
  }
})