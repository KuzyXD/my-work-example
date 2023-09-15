<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-4">
        <p class="has-text-centered">Контейнер:
          <span :class="keyPairID ? 'has-text-weight-bold has-text-success' : 'has-text-weight-bold has-text-danger'">
            {{ keyPairID ? "создан" : "отсутствует" }}
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-centered" v-if="!keyPairID">
      <div class="column is-5">
        <b-button expanded size="is-medium" type="is-info" @click="createKeyPair" :disabled="!loggedIn || keyPairID !== undefined">Сгенерировать ключевую пару</b-button>
      </div>
    </div>

    <b-loading :is-full-page="false" v-model="loading" :can-cancel="false" />
  </div>
</template>

<script>
import {getAllSlots, toUTF8Array, asciitohex} from "@/assets/helpers.js";
import rutoken from "rutoken";

export default {
  data() {
    return {
      loading: false,
      keyPairID: undefined,
      fullYear: new Date(Date.now()).getFullYear().toString(),
    }
  },
  methods: {
    createKeyPair() {
      if(this.selectedDriver === "jacarta") {
        this.createJacartaKeyPair();
      }
      else if(this.selectedDriver === "rutoken") {
        this.createRutokenKeyPair();
      }
    },
    checkForAlreadyCreatedKeyPair() {
      if(this.selectedDriver === "jacarta") {
        this.jacartaCheckForAlreadyCreatedKeyPair();
      }
      else if(this.selectedDriver === "rutoken") {
        this.rutokenCheckForAlreadyCreatedKeyPair();
      }
    },

    jacartaCheckForAlreadyCreatedKeyPair() {
      const vue = this;
      this.loading = true;

      window.JCWebClient2.getKeyPairList({
        args: {
          tokenID: this.selectedDevice,
        },
        onSuccess: function (keypair) {
          keypair.forEach(token => {
            if(token.description === (vue.fullYear + "-" + vue.applicationId)) {
              vue.keyPairID = token.id;
              vue.$store.commit("keypair/setId", token.id);
              return;
            }
          });

          vue.loading = false;
        },
        onError: error => vue.handleJCError(error.toString() + " (Ошибка получения ключевых пар для установки сертификата)")
      });
    },
    createJacartaKeyPair(){
      const vue = this;
      this.loading = true;

      window.JCWebClient2.createKeyPair({
        args: {
          paramSet: "XA",
          description: this.fullYear + "-" + this.$store.getters["application/id"],
          ckaID: toUTF8Array(this.fullYear + "-" + this.$store.getters["application/id"]),
          algorithm: window.JCWebClient2.Vars.KeyAlgorithm.GOST_2012_256
        },
        onSuccess: function (keypair) {
          vue.keyPairID = keypair;

          vue.$store.commit("keypair/setId", keypair);

          vue.$buefy.toast.open({
            message: `Ключевая пара "${vue.fullYear + "-" + vue.applicationId}" создана успешно`,
            type: "is-success",
            duration: 4000,
            queue: false,
          });

          vue.loading = false;
        },
        onError: error => vue.handleErrors(error.toString())
      });
    },

    async createRutokenKeyPair() {
      const vue = this;
      this.loading = true;

      try {
        this.keyPairID = await this.rutokenPlugin.generateKeyPair(vue.selectedDevice, undefined, (vue.fullYear + "-" + vue.applicationId), {
          id: asciitohex((vue.fullYear + "-" + vue.applicationId)),
          publicKeyAlgorithm: vue.rutokenPlugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_256,
          paramset: "XA"
        });

        this.$store.commit("keypair/setId", this.keyPairID);

        vue.$buefy.toast.open({
          message: `Ключевая пара "${vue.fullYear + "-" + vue.applicationId}" создана успешно`,
          type: "is-success",
          duration: 4000,
          queue: false,
        });
      }
      catch (e) {
        await this.handleRutokenErrors(e);
      }

      this.loading = false;
    },
    async rutokenCheckForAlreadyCreatedKeyPair() {
      this.loading = true;

      try {
        let keypairs = await this.rutokenPlugin.enumerateKeys(this.selectedDevice, (this.fullYear + "-" + this.applicationId));

        if(keypairs.length > 1) {
          this.$buefy.toast.open({
            message: `Контейнер ${this.fullYear + "-" + this.applicationId} существует в количестве — ${keypairs.length}. Удалите ненужный контейнер во избежание ошибок`,
            type: "is-danger",
            duration: 10000,
            queue: false,
          });
          return;
        }

        this.keyPairID = keypairs[0];

        this.$store.commit("keypair/setId", keypairs[0]);
      }
      catch (e) {
        await this.handleRutokenErrors(e);
      }

      this.loading = false;
    },

    async handleRutokenErrors(error) {
      if(this.loading) {
        this.loading = false;
      }
      let info = this.getKeyByValue(await this.rutokenPlugin.errorCodes, Number.parseInt(error.message));
      console.log(error)

      this.$buefy.toast.open({
        message: `Ошибка, ${info}`,
        type: "is-danger",
        duration: 6000,
        queue: false,
      });
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    },
    handleErrors(error) {
      if(this.loading) {
        this.loading = false;
      }

      this.$buefy.toast.open({
        message: `Ошибка, ${error.toString()}`,
        type: "is-danger",
        duration: 6000,
        queue: false,
      });
    },
  },
  computed: {
    rutokenPlugin() {
      return this.$store.getters["driver/rutokenPlugin"];
    },
    selectedDriver() {
      return this.$store.getters["driver/selectedDriver"];
    },
    selectedDevice() {
      return this.$store.getters["token/selectedDevice"];
    },
    loggedIn() {
      return this.$store.getters["token/loggedIn"];
    },
    applicationId() {
      return this.$store.getters["application/id"];
    }
  },
  mounted() {
    this.checkForAlreadyCreatedKeyPair();
  }
}
</script>

<style scoped>

</style>
