<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-1">
        <b-button
          size="is-medium"
          icon-left="account-box"
          :type="dnIconType"
          :disabled="Object.keys(dn).length <= 0 "
          @click="viewApplicationData"
        >
        </b-button>
      </div>
      <div class="column is-5">
        <b-button expanded size="is-medium" type="is-info" @click="createRequest" :disabled="!loggedIn && keyPairID !== undefined">Сгенерировать запрос</b-button>
      </div>
    </div>

    <b-loading v-model="loading" :is-full-page="false" :can-cancel="false" />
  </div>
</template>

<script>
import {getRegionsObject, toBase64} from "../assets/helpers";

export default {
  data() {
    return {
      dn: {},
      dnIconType: "is-danger",

      loading: false,
    }
  },
  methods: {
    createRequest() {
      if(this.selectedDriver === "jacarta") {
        this.createJacartaRequest();
      }
      else if(this.selectedDriver === "rutoken") {

      }
    },
    createJacartaRequest() {
      const vue = this;
      this.loading = true;
      let dn = {};

      if(this.dn.type === 1) {
        dn = this.getPhysDnForJacarta;
      }
      else if(this.dn.type === 2) {
        dn = this.getIpDnForJacarta;
      }
      else {
        dn = this.getOrganizationDnForJacarta;
      }

      window.JCWebClient2.genCSR({
        args: {
          id: vue.keyPairID,
          dn: dn,
          exts: {},
        },
        onSuccess: async function (request) {
          let requestB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(request)));
          vue.sendRequestToAOAC(requestB64);
        },
        onError: error => vue.handleErrors(error.toString() + " (Ошибка при генерации запроса на сертификат)")
      });
    },
    createRutokenRequest() {

    },

    sendRequestToAOAC(request) {
      const vue = this;

      this.$axios.post("/api/request/attach_file/", {
        login: this.$store.getters["auth/login"],
        pass: this.$store.getters["auth/pass"],
        fileName: "request.p10",
        file: request,
        fileType: 0,
        requestId: Number.parseInt(this.applicationId),
      }).then(response => {
        this.loading = false;
        vue.$buefy.toast.open({
          message: "Файл запроса прикреплен к заявлению в личном кабинете",
          type: "is-success",
          duration: 6000,
          queue: false,
        });
      }).catch(e => {
        this.loading = false;

        vue.$buefy.toast.open({
          message: `Ошибка при отправке файла запроса, ${e.toString()}`,
          type: "is-danger",
          duration: 10000,
          queue: false,
        });
      });
    },

    async getApplicationData() {
      this.loading = true;

      let response = await this.downloadApplicationData();

      if(response.status === 200) {
        this.dnIconType = "is-success";
        this.dn = response.data.info;
      }

      this.loading = false;
    },
    async downloadApplicationData() {
      const vue = this;

      return await this.$axios.post("/api/request/view/", {
        login: this.$store.getters["auth/login"],
        pass: this.$store.getters["auth/pass"],
        requestId: this.$store.getters["application/id"],
      }).catch(e => {
        vue.$buefy.toast.open({
          message: `Ошибка при получении данных заявки, ${e.toString()}`,
          type: "is-danger",
          duration: 10000,
          queue: false,
        });
      });
    },

    viewApplicationData() {
      this.$buefy.dialog.alert({
        title: "Данные заявки",
        message: this.getTextOfDNOjbect(),
        ariaModal: true
      });
    },

    getTextOfDNOjbect() {
      let text = "";

      for (const [key, value] of Object.entries(this.dn)) {
        if(key === "region") {
          text += `${key} <br/>${this.getRegionByNumber(value)}<br/></br>`;
        }
        else if(value !== null) {
          text += `${key} <br/>${value}<br/></br>`;
        }
      }

      return text;
    },
    getRegionByNumber(number) {
      let regions = getRegionsObject();

      return regions[number];
    },
    getRegionForDNByNumber(number) {
      let prefix = number < 10 ? "0" : "";

      return `${prefix}${number} ${this.getRegionByNumber(number)}`
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
    getPhysDnForJacarta() {
      return {
        "2.5.4.4": this.dn.lastName,
        "2.5.4.42": `${this.dn.firstName} ${this.dn.middleName}`.trim(),
        "2.5.4.3": `${this.dn.firstName} ${this.dn.lastName} ${this.dn.middleName}`.trim(),
        "2.5.4.6": "RU",
        "2.5.4.8": this.getRegionForDNByNumber(this.dn.region),
        "2.5.4.7": this.dn.city,
        "2.5.4.9": this.dn.address,
        "1.2.643.100.3": "NUMERICSTRING:" + this.dn.snils,
        "1.2.643.3.131.1.1": "NUMERICSTRING:" + this.dn.inn,
        "1.2.840.113549.1.9.1": this.dn.email,
      };
    },
    getIpDnForJacarta() {
      return {
        "2.5.4.4": this.dn.lastName,
        "2.5.4.42": `${this.dn.firstName} ${this.dn.middleName}`.trim(),
        "2.5.4.3": `${this.dn.firstName} ${this.dn.lastName} ${this.dn.middleName}`.trim(),
        "2.5.4.6": "RU",
        "2.5.4.8": this.getRegionForDNByNumber(this.dn.region),
        "2.5.4.7": this.dn.city,
        "2.5.4.9": this.dn.address,
        "1.2.643.100.5": "NUMERICSTRING:" + this.dn.ogrnip,
        "1.2.643.100.3": "NUMERICSTRING:" + this.dn.snils,
        "1.2.643.3.131.1.1": "NUMERICSTRING:" + this.dn.inn,
        "1.2.840.113549.1.9.1": this.dn.email,
      };
    },
    getOrganizationDnForJacarta() {
      return {
        "2.5.4.4": this.dn.headLastName,
        "2.5.4.42": `${this.dn.firstName} ${this.dn.middleName}`.trim(),
        "2.5.4.12": this.dn.position,
        "2.5.4.3": this.dn.company,
        "2.5.4.10": this.dn.company,
        "2.5.4.11": this.dn.department,
        "2.5.4.6": "RU",
        "2.5.4.8": this.getRegionForDNByNumber(this.dn.regionLaw),
        "2.5.4.7": this.dn.cityLaw,
        "2.5.4.9": this.dn.addressLaw,
        "1.2.643.100.1": "NUMERICSTRING:" + this.dn.ogrn,
        "1.2.643.100.3": "NUMERICSTRING:" + this.dn.snils,
        "1.2.643.3.131.1.1": "NUMERICSTRING:00" + this.dn.inn,
        "1.2.840.113549.1.9.1": this.dn.email,
      };
    },
    getPhysDnForRutoken() {
      return [
        {rdn: "2.5.4.4", value: this.dn.lastName},
        {rdn: "2.5.4.42", value: `${this.dn.firstName} ${this.dn.middleName}`.trim()},
        {rdn: "2.5.4.3", value: `${this.dn.firstName} ${this.dn.lastName} ${this.dn.middleName}`.trim()},
        {rdn: "2.5.4.6", value: "RU"},
        {rdn: "2.5.4.8", value: this.getRegionForDNByNumber(this.dn.region)},
        {rdn: "2.5.4.7", value: this.dn.city},
        {rdn: "2.5.4.9", value: this.dn.address},
        {rdn: "1.2.643.100.3", value: this.dn.snils},
        {rdn: "1.2.643.3.131.1.1", value: this.dn.inn},
        {rdn: "1.2.840.113549.1.9.1", value: this.dn.email},
      ]
    },
    getIpDnForRutoken() {
      return [
        {rdn: "2.5.4.4", value: this.dn.lastName},
        {rdn: "2.5.4.42", value: `${this.dn.firstName} ${this.dn.middleName}`.trim()},
        {rdn: "2.5.4.3", value: `${this.dn.firstName} ${this.dn.lastName} ${this.dn.middleName}`.trim()},
        {rdn: "2.5.4.6", value: "RU"},
        {rdn: "2.5.4.8", value: this.getRegionForDNByNumber(this.dn.region)},
        {rdn: "2.5.4.7", value: this.dn.city},
        {rdn: "2.5.4.9", value: this.dn.address},
        {rdn: "1.2.643.100.5", value: this.dn.ogrnip},
        {rdn: "1.2.643.100.3", value: this.dn.snils},
        {rdn: "1.2.643.3.131.1.1", value: this.dn.inn},
        {rdn: "1.2.840.113549.1.9.1", value: this.dn.email},
      ]
    },
    getOrganizationDnForRutoken() {
      return [
        {rdn: "2.5.4.4", value: this.dn.headLastName},
        {rdn: "2.5.4.42", value: `${this.dn.firstName} ${this.dn.middleName}`.trim()},
        {rdn: "2.5.4.12", value: this.dn.position},
        {rdn: "2.5.4.3", value: this.dn.company},
        {rdn: "2.5.4.10", value: this.dn.company},
        {rdn: "2.5.4.11", value: this.dn.department},
        {rdn: "2.5.4.6", value: "RU"},
        {rdn: "2.5.4.8", value: this.getRegionForDNByNumber(this.dn.regionLaw)},
        {rdn: "2.5.4.7", value: this.dn.cityLaw},
        {rdn: "2.5.4.9", value: this.dn.addressLaw},
        {rdn: "1.2.643.100.1", value: this.dn.ogrn},
        {rdn: "1.2.643.100.3", value: this.dn.snils},
        {rdn: "1.2.643.3.131.1.1", value: "00" + this.dn.inn},
        {rdn: "1.2.840.113549.1.9.1", value: this.dn.email},
      ]
    },

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
    },
    keyPairID() {
      return this.$store.getters["keypair/id"];
    },
  },
  mounted() {
    this.getApplicationData();
    this.errors();
  }
}
</script>

<style scoped>

</style>
