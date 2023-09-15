<template>
  <b-modal
    v-model="show"
    has-modal-card
    trap-focus
    aria-role="dialog"
    aria-label="Авторизация в 'Основание'"
    aria-modal
  >
    <template #default="props">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <h4 class="title is-4">Войдите в АО АЦ</h4>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Логин" expanded>
                <b-input v-model="login"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Пароль" expanded>
                <b-input type="password" v-model="pass"></b-input>
              </b-field>
            </div>
          </div>
          <div class="column">
            <b-button expanded type="is-info" @click="logIn"> Войти </b-button>
          </div>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import products from "../mixins.js/products.js";

export default {
  mixins: [products],
  data() {
    return {
      login: "",
      pass: "",
    };
  },
  props: ["isAOACLogin"],
  methods: {
    async logIn() {
      if (await this.AOACLogin()) {
        this.setLoginAndPass();
        this.setLoginStatus();
        this.clearFields();
        await this.downloadProductsList();

        this.show = false;
      }
    },
    async AOACLogin() {
      return await this.$axios
        .$post("/api/request/status", {
          login: this.login,
          pass: this.pass,
          requests: [1],
        })
        .catch((error) => {
          this.$buefy.toast.open({
            message: `Ошибка при авторизации, ${error.response.data}`,
            type: "is-danger",
            duration: 4000,
            queue: false,
          });
        });
    },
    setLoginAndPass() {
      this.$store.commit("auth/setLogin", this.login);
      this.$store.commit("auth/setPass", this.pass);
    },
    setLoginStatus() {
      this.$store.commit("auth/setLoginStatus", true);
    },
    clearFields() {
      this.login = "";
      this.pass = "";
    },
  },
  computed: {
    show: {
      get: function () {
        return this.isAOACLogin;
      },
      set: function () {
        return this.$emit("closed");
      },
    },
  },
};
</script>
