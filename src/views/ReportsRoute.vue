<template>
  <div class="reports-route">
    <div class="reports-route__container">
      <div class="reports-route__header">
        <button
          class="reports-route__button reports-route__button--blue"
          @click="$router.push({ name: 'SingleReportRoute', params: { id: 0 } })"
        >
          Добавить отчет
        </button>
      </div>
      <div class="reports-route__list">
        <div
          v-for="(r, index) in REPORTS"
          :key="`report-${r.id}`"
          class="report"
        >
          <div class="report__content">
            <p class="report__title">{{ r.name }}</p>
            <div class="report__meta">
              <p>{{ r.author }}</p>
              <p>{{ r.timeToPass }} минут</p>
              <p
                :class="`report__meta-text--${r.isAccepted ? 'accepted': 'not-accepted'}`"
              >{{ r.isAccepted ? 'Принят' : 'Не принят' }}</p>
            </div>
          </div>
          <div class="report__buttons">
            <button
              class="report__button report__button--blue"
              @click="$router.push({ name: 'SingleReportRoute', params: { id: r.id } })"
            >
              Редактировать
            </button>
            <button
              class="report__button report__button--red"
              @click="deleteReport(index)"
            >
              Удалить
            </button>
            <button
              :class="`report__button--${r.isAccepted ? 'disabled' : 'green'}`"
              class="report__button"
              @click="acceptReport(index)"
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ReportsRoute',
  computed: {
    ...mapGetters([
      'REPORTS',
    ]),
  },
  methods: {
    ...mapActions([
      'DELETE_REPORT_BY_INDEX',
      'ACCEPT_REPORT_BY_INDEX',
    ]),
    deleteReport(index) {
      this.$swal({
        title: 'Удалить отчет?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
      }).then((result) => {
        if (result.isConfirmed) {
          this.DELETE_REPORT_BY_INDEX(index);
        }
      });
    },
    acceptReport(index) {
      this.$swal({
        title: 'Принять отчет?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ACCEPT_REPORT_BY_INDEX(index);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.reports-route {
  min-height: 100vh;
  padding: 60px 0;
  background-color: $col-blue-1;

  &__container {
    @include root-container;
  }

  &__header {
    padding: 10px 20px;
  }

  &__button {
    @include button;
  }

  &__list {
    padding: 0 20px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: $sh-1;
    overflow: hidden;
  }
}

.report {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid $col-blue-2;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  &__title {
    font-weight: 700;
  }

  &__meta {
    margin: 10px 0 0 10px;
  }

  &__meta-text {

    &--accepted {
      color: $col-green-1;
    }

    &--not-accepted {
      color: $col-red-1;
    }
  }

  &__buttons  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 5px;
  }

  &__button {
    @include button($py: 8px, $px: 12px, $fz: .7rem);
  }
}

@media screen and (min-width: $largePhone) {

  .report {
    padding: 20px;

    &__meta {
      margin-left: 15px;
    }
  }
}

</style>
