<template>
  <section class="section">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h4 class="title is-4">Используйте ID "Основания"</h4>
          <p>Впишите ID заявления в ЛК "Основания", чтобы приступить к созданию ключевой пары и т.д</p>
          <div class="columns is-vcentered">
            <div class="column is-2">
              <b-input placeholder="ID" v-model="id" :disabled="buttonsDisabled" @keyup.enter.native="selectClient"></b-input>
            </div>
            <div class="column is-4">
              <b-button expanded type="is-info" @click="selectClient" :disabled="buttonsDisabled">Использовать</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: undefined,
      buttonsDisabled: false,
    }
  },
  methods: {
    async selectClient() {
      if(this.id) {
        let application = await this.AOACGetApplication();

        if(application) {
          this.buttonsDisabled = true;

          this.$buefy.toast.open({
            message: `Используются данные из заявки ${this.id}, на ${application.info.lastName} ${application.info.firstName} ${application.info.middleName}`,
            type: "is-info",
            duration: 10000,
            queue: false,
          });

          this.$emit("changePage");
          this.$store.commit("application/setId", this.id);
          this.$store.commit("application/setStatus", application.status);
        }
      }
    },
    async AOACGetApplication() {
      return await this.$axios.$post("/api/request/view", {
        "login": this.$store.getters["auth/login"],
        "pass": this.$store.getters["auth/pass"],
        "requestId": this.id
      }).catch(error => {
        this.$buefy.toast.open({
          message: `Ошибка получения данных из заявления, ${error.response.data.toLowerCase()}`,
          type: "is-danger",
          duration: 4000,
          queue: false,
        });
      });
    },
  }
}
</script>

<style scoped>

</style>
