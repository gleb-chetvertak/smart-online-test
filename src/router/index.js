import Vue from 'vue';
import VueRouter from 'vue-router';
import ReportsRoute from '../views/ReportsRoute.vue';

Vue.use(VueRouter);

const reportParams = (route) => ({
  id: Number(route.params.id),
});

const routes = [
  {
    path: '/',
    name: 'ReportsRoute',
    component: ReportsRoute,
  },
  {
    path: '/report/:id',
    name: 'SingleReportRoute',
    props: reportParams,
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleReportRoute.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
