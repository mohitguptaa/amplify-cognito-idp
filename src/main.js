import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
