<template>
  <div class="columns">
    <div class="column is-4">
      <b-field label="Выберите токен:">
        <template v-slot:message>
          <a href="" @click.prevent="getDevices">Обновить список</a>
        </template>
        <b-select expanded v-model="selectedDevice" :disabled="loggedIn">
          <option v-for="token in tokens" :key="tokens.indexOf(token)" :value="token.slot.id.toString()">
            {{token.slot.device.serialNumber}}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-flex is-align-self-center pb-0">
      <b-button
        :icon-left="logInIcon"
        :type="logInIconType"
        :disabled="loggedIn"
        @click="loginInToken">
        {{loggedIn ? "Вход выполнен" : "Войти в токен" }}
      </b-button>
    </div>

    <b-loading :is-full-page="false" v-model="loading" :can-cancel="false" />
  </div>
</template>

<script>
import {getAllSlots} from "../assets/helpers";

export default {
  data() {
    return {
      tokens: [],
      selectedDevice: undefined,
      tokenPinCode: undefined,
      loading: false,

      logInIcon: "lock-alert",
      logInIconType: "is-danger",
      loggedIn: false,
    }
  },
  methods: {
    getDevices() {
      let devices = [];

      if(this.selectedDriver === "jacarta") {
        this.getJacartaDevices();
      }
      else if(this.selectedDriver === "rutoken") {
        this.getRutokenDevices();
      }

      return devices;
    },
    loginInToken() {
      this.$buefy.dialog.prompt({
        message: "Введите пин-код от токена:",
        cancelText: "Отменить",
        trapFocus: true,
        inputAttrs: {
          type: "password"
        },
        onConfirm: (value) => {
          this.tokenPinCode = value;

          if(this.selectedDriver === "jacarta") {
            this.jacartaLogin();
          }
          else if(this.selectedDriver === "rutoken") {
            this.rutokenLogin();
          }
        }
      });
    },

    getJacartaDevices() {
      const vue = this;
      this.loading = true;

      window.JCWebClient2.getAllSlots({
        onSuccess: function (results) {
          vue.tokens = getAllSlots(results);
          vue.loading = false;
        },
        onError: error => vue.handleErrors(error)
      });
    },
    async jacartaLogin() {
      const vue = this;
      this.loading = true;

      await this.jacartaLogout();

      window.JCWebClient2.bindToken({
        args: {
          tokenID: vue.selectedDevice,
          pin: vue.tokenPinCode
        },
        onSuccess: function () {
          vue.loading = false;
          vue.logInIcon = "lock-check";
          vue.logInIconType = "is-success";
          vue.loggedIn = true;
          vue.$buefy.toast.open({
            message: "Доступ к токену разрешен. Пин-код принят.",
            type: "is-success",
            duration: 2000,
            queue: false,
          });
        },
        onError: error => vue.handleErrors(error.toString() + " (Ошибка авторизации токена)")
      });
    },
    async jacartaLogout() {
      if(window.JCWebClient2.getLoggedInState({async:false}).state !== 0) {
        await window.JCWebClient2.unbindToken({async:false});
      }
    },

    async getRutokenDevices() {
      try {
        this.loading = true;

        let devices = await this.rutokenPlugin.enumerateDevices();
        await this.getDevicesInfo(devices);

        this.loading = false;
      }
      catch (e) {
        await this.handleRutokenErrors(e);
      }
    },
    async getDevicesInfo(devices) {
      this.tokens = [];
      for (const deviceId of devices) {
        this.tokens.push({
          slot: {
            id: deviceId,
            device: {
              serialNumber: await this.getDeviceSN(deviceId)
            }
          }
        });
      }
    },
    async getDeviceSN(deviceId) {
      try {
        return this.rutokenPlugin.getDeviceInfo(deviceId, this.rutokenPlugin.TOKEN_INFO_SERIAL);
      }
      catch (e) {
        await this.handleRutokenErrors(e);
      }
    },
    async rutokenLogin() {
      try {
        this.loading = true;

        await this.rutokenPlugin.login(this.selectedDevice, this.tokenPinCode);

        this.$buefy.toast.open({
          message: "Доступ к токену разрешен. Пин-код принят.",
          type: "is-success",
          duration: 2000,
          queue: false,
        });

        this.logInIcon = "lock-check";
        this.logInIconType = "is-success";
        this.loggedIn = true;

        this.loading = false;
      }
      catch (e) {
        await this.handleRutokenErrors(e);
      }
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
  },
  computed: {
    selectedDriver() {
      return this.$store.getters["driver/selectedDriver"];
    },
    rutokenPlugin() {
      return this.$store.getters["driver/rutokenPlugin"];
    }
  },
  watch: {
    selectedDevice(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.$store.commit("token/setSelectedDevice", newValue);
      }
    },
    loggedIn(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.$store.commit("token/setLoggedIn", newValue);
      }
    },

  },
  mounted() {
    this.getDevices();
  }
}
</script>

<style scoped>

</style>
