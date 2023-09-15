<template>
  <section class="section">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h4 class="title is-4">Взаимодействие с токеном</h4>

          <select-token></select-token>

          <div class="column">
            <b-tabs id="dashboardtabs" size="is-medium" type="is-toggle" :animated="false" expanded>
              <b-tab-item label="Создать ключевую пару" icon="usb-flash-drive" :disabled="!loggedIn">
                <key-pair-create v-if="loggedIn"></key-pair-create>
              </b-tab-item>
              <b-tab-item label="Создать запрос PCKS10" icon="file-plus" :disabled="!loggedIn">
                <create-p-c-k-s10 v-if="loggedIn && status === 'Генерация запроса'"></create-p-c-k-s10>
                <div class="columns is-centered" v-else>
                  <div class="column is-5">
                    <p class="has-text-weight-bold has-text-danger has-text-centered">Недоступно</p>
                  </div>
                </div>
              </b-tab-item>
              <b-tab-item label="Установить сертификат" icon="arrow-down-bold-box" :disabled="!loggedIn">
                <install-certificate v-if="loggedIn && status ==='Готово'"></install-certificate>
                <div class="columns is-centered" v-else>
                  <div class="column is-5">
                    <p class="has-text-weight-bold has-text-danger has-text-centered">Недоступно</p>
                  </div>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CreatePCKS10 from "./CreatePCKS10";
import InstallCertificate from "./InstallCertificate";
export default {
  components: {InstallCertificate, CreatePCKS10},
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["token/loggedIn"];
    },
    status() {
      return this.$store.getters["application/status"];
    }
  }
}
</script>

<style>
.tabs > ul:nth-child(1) {
  margin-left: 0 !important;
}
</style>
