import Vue from 'vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

const sweetalertOptions = {
  confirmButtonColor: '#000000',
  customClass: {
    confirmButton: 'sweetalert-button sweetalert-button--green',
    denyButton: 'sweetalert-button sweetalert-button--red',
  },
};

Vue.use(VueSweetalert2, sweetalertOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
