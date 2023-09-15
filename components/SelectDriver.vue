<template>
  <section class="section">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h4 class="title is-4">Выберите драйвер</h4>
          <p>Выберите драйвер токена. Если вы хотите сменить драйвер, перезагрузите страницу комбинацией <span class="has-text-weight-bold">CTRL+R</span></p>
          <div class="columns">
            <div class="column is-one-fifth">
              <b-button expanded type="is-info" :disabled="disableDrivers" @click="setUpDriver('jacarta')">JaCarta</b-button>
            </div>
            <div class="column is-one-fifth">
              <b-button expanded type="is-danger" :disabled="disableDrivers" @click="setUpDriver('rutoken')">Рутокен</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import rutoken from "rutoken";

export default {
  data() {
    return {
      disableDrivers: false,
    }
  },
  methods: {
    setUpDriver(driver) {
      this.disableDrivers = true;

      if(driver === "jacarta") {
        this.jacartaInit();
      }
      else if(driver === "rutoken") {
        this.rutokenInit();
      }

      this.$store.commit("driver/setSelectedDriver", driver);
    },
    jacartaInit() {
      const vue = this;

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/JCWebClient.js";

      script.onload = async function () {
        window.JCWebClient2.defaults({
          async: true,
          errorToString: true,
        });

        await window.JCWebClient2.initialize();

        if(window.JCWebClient2.isInitialized()) {
          vue.showToast("Jacarta плагин загружен и готов к работе.");
          vue.$store.commit("driver/setReady", true);
        }
      }

      document.body.appendChild(script);
    },
    rutokenInit() {
      const vue = this;

      rutoken.ready.then(function () {
        if (window.chrome || typeof InstallTrigger !== 'undefined') {
          return rutoken.isExtensionInstalled();
        } else {
          return Promise.resolve(true);
        }
      }).then(function (result) {
        if (result) {
          return rutoken.isPluginInstalled();
        } else {
          vue.$buefy.toast.open({
            message: "Расширение Рутокен Плагин не установлено.",
            type: "is-danger",
            queue: false,
          });
        }
      }).then(function (result) {
        if (result) {
          return rutoken.loadPlugin();
        } else {
          vue.$buefy.toast.open({
            message: "Рутокен Плагин не найден.",
            type: "is-danger",
            queue: false,
          });
        }
      }).then(async function (plugin) {
        vue.showToast("Рутокен плагин загружен и готов к работе.");
        vue.$store.commit("driver/setRutokenPlugin", plugin);
        vue.$store.commit("driver/setReady", true);
          console.log(await plugin.errorCodes);
      });
    },
    showToast(text) {
      this.$buefy.toast.open({
        message: text,
        type: "is-success",
        duration: 4000,
        queue: false,
      })
    }
  }
}
</script>

<style scoped>

</style>
