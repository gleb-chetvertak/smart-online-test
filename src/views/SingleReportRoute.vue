<template>
  <div class="single-report-route">
    <div class="single-report-route__container">
      <div class="single-report-route__header">
        <template
          v-if="id"
        >
          <button
            class="single-report-route__button single-report-route__button--blue"
            @click="updateReport()"
          >
            Сохранить изменения
          </button>
          <button
            class="single-report-route__button single-report-route__button--orange"
            @click="cancelEdits()"
          >
            Отменить редактирование
          </button>
          <button
            :class="`single-report-route__button--${form.isAccepted ? 'disabled' : 'green'}`"
            class="single-report-route__button"
            @click="acceptReport()"
          >
            Сменить статус на принят
          </button>
          <button
            class="single-report-route__button single-report-route__button--red"
            @click="deleteReport()"
          >
            Удалить
          </button>
        </template>
        <template
          v-else
        >
          <button
            class="single-report-route__button single-report-route__button--green"
            @click="createReport()"
          >
            Добавить отчет
          </button>
          <button
            class="single-report-route__button single-report-route__button--orange"
            @click="cancelEdits()"
          >
            Отменить редактирование
          </button>
        </template>
      </div>
      <div class="form">
        <p class="form__label">Название:</p>
        <input
          type="text"
          class="form__input"
          v-model.trim="form.name"
        >
        <p class="form__label">Автор:</p>
        <input
          type="text"
          class="form__input"
          v-model.trim="form.author"
          :disabled="id ? true : false"
        >
        <p class="form__label">Время прохождения (мин.):</p>
        <input
          type="number"
          class="form__input"
          v-model.trim="form.timeToPass"
        >
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SingleReportRoute',
  props: {
    id: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      form: {
        name: '',
        author: '',
        timeToPass: null,
        isAccepted: false,
      },
    };
  },
  computed: {
    ...mapGetters([
      'REPORT',
    ]),
  },
  methods: {
    ...mapActions([
      'CREATE_REPORT',
      'UPDATE_REPORT',
      'ACCEPT_REPORT_BY_ID',
      'DELETE_REPORT_BY_ID',
    ]),
    loadReport() {
      if (this.id) {
        (this.form = { ...this.REPORT(this.id) });
      }
    },
    createReport() {
      this.CREATE_REPORT(this.form);
      this.$router.push({ name: 'ReportsRoute' });
    },
    updateReport() {
      this.UPDATE_REPORT({ ...this.id, ...this.form });
      this.$router.push({ name: 'ReportsRoute' });
    },
    cancelEdits() {
      this.$swal({
        title: 'Отменить редактирование?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: 'ReportsRoute' });
        }
      });
    },
    acceptReport() {
      this.$swal({
        title: 'Принять отчет?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ACCEPT_REPORT_BY_ID(this.id);
          this.$router.push({ name: 'ReportsRoute' });
        }
      });
    },
    deleteReport() {
      this.$swal({
        title: 'Удалить отчет?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
      }).then((result) => {
        if (result.isConfirmed) {
          this.DELETE_REPORT_BY_ID(this.id);
          this.$router.push({ name: 'ReportsRoute' });
        }
      });
    },
  },
  mounted() {
    this.loadReport();
  },
};
</script>

<style lang="scss" scoped>

.single-report-route {
  min-height: 100vh;
  padding: 60px 0;
  background-color: $col-blue-1;

  &__container {
    @include root-container;
  }

  &__header {
    display: flex;
    padding: 10px 20px;
    flex-direction: column;
    gap: 10px;
  }

  &__button {
    @include button;
  }
}

.form {
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: $sh-1;
  overflow: hidden;

  &__label {
    @include form-label;
  }

  &__input {
    @include form-input;
  }
}

@media screen and (min-width: $tablet) {

  .single-report-route  {

    &__header {
      flex-direction: row;
      gap: 20px;
    }
  }
}

</style>
