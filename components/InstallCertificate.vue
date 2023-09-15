<template>
  <div class="columns is-centered">
    <div class="column is-4">
      <b-button expanded size="is-medium" type="is-info" @click="" :disabled="!loggedIn && keyPairID !== undefined">Установить сертификат</b-button>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    async downloadCertificate() {
      const vue = this;

      return await this.$axios.post("/api/request/result/", {
        login: this.$store.getters["auth/login"],
        pass: this.$store.getters["auth/pass"],
        requestId: this.$store.getters["application/id"],
      }).catch(e => {
        vue.$buefy.toast.open({
          message: `Ошибка при получении сертификата заявки, ${e.toString()}`,
          type: "is-danger",
          duration: 10000,
          queue: false,
        });
      });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["token/loggedIn"];
    },
    keyPairID() {
      return this.$store.getters["keypair/id"];
    },
  }
}
</script>

<style scoped>

</style>
