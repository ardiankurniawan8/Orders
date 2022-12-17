import Vue from 'vue'

Vue.filter('number', function (value) {
  if (!value) { return 0 }
  const val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
})
