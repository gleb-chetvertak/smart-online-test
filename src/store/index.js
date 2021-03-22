import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reports: [
      {
        id: 1,
        name: 'Оборот январь 2020',
        author: 'Андрей Гав',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 2,
        name: 'Оборот февраль 2020',
        author: 'Сергей Ланкарра',
        isAccepted: false,
        timeToPass: 60,
      },
      {
        id: 3,
        name: 'Оборот март 2020',
        author: 'Олег Обломов',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 4,
        name: 'Оборот апрель 2020',
        author: 'Лусинэ Геворкян',
        isAccepted: false,
        timeToPass: 60,
      },
      {
        id: 5,
        name: 'Оборот май 2020',
        author: 'Олег Абрамов',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 6,
        name: 'Оборот июнь 2020',
        author: 'Владимир Котляров',
        isAccepted: false,
        timeToPass: 60,
      },
      {
        id: 7,
        name: 'Оборот июль 2020',
        author: 'Сергей Карамушкин',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 8,
        name: 'Оборот август 2020',
        author: 'Игорь Бортник',
        isAccepted: false,
        timeToPass: 60,
      },
      {
        id: 9,
        name: 'Оборот сентябрь 2020',
        author: 'Александр Уман',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 10,
        name: 'Оборот октябрь 2020',
        author: 'Михаил Горшенев',
        isAccepted: false,
        timeToPass: 60,
      },
      {
        id: 11,
        name: 'Оборот ноябрь 2020',
        author: 'Владимир Шахрин',
        isAccepted: true,
        timeToPass: 60,
      },
      {
        id: 12,
        name: 'Оборот декабрь 2020',
        author: 'Зак Снайдер',
        isAccepted: false,
        timeToPass: 60,
      },
    ],
  },
  mutations: {
    DELETE_REPORT_BY_INDEX: (state, index) => {
      state.reports.splice(index, 1);
    },
    ACCEPT_REPORT_BY_INDEX: (state, index) => {
      state.reports[index].isAccepted = true;
    },
    CREATE_REPORT: (state, report) => {
      const lastReportIndex = state.reports.length - 1;
      const id = state.reports[lastReportIndex].id + 1;
      state.reports.push({
        id,
        ...report,
      });
    },
    UPDATE_REPORT: (state, { id, ...REST }) => {
      const index = state.reports.findIndex((r) => r.id === id);
      state.reports[index] = {
        id,
        ...REST,
      };
    },
  },
  actions: {
    DELETE_REPORT_BY_INDEX({ commit }, index) {
      commit('DELETE_REPORT_BY_INDEX', index);
    },
    DELETE_REPORT_BY_ID({ state, commit }, id) {
      const index = state.reports.findIndex((r) => r.id === id);
      commit('DELETE_REPORT_BY_INDEX', index);
    },
    ACCEPT_REPORT_BY_INDEX({ commit }, index) {
      commit('ACCEPT_REPORT_BY_INDEX', index);
    },
    ACCEPT_REPORT_BY_ID({ state, commit }, id) {
      const index = state.reports.findIndex((r) => r.id === id);
      commit('ACCEPT_REPORT_BY_INDEX', index);
    },
    CREATE_REPORT({ commit }, report) {
      commit('CREATE_REPORT', report);
    },
    UPDATE_REPORT({ commit }, { id, ...REST }) {
      commit('UPDATE_REPORT', { id, ...REST });
    },
  },
  getters: {
    REPORTS: (state) => state.reports,
    REPORT: (state) => (id) => state.reports.find((r) => r.id === id),
  },
});
