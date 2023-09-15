export default {
  data() {
    return {};
  },
  methods: {
    async downloadProductsList() {
      let response = await this.downloadProductsListThroughAxios();

      if (response.status === 200) {
        this.$store.commit("products/setList", response.data);
      }
    },
    downloadProductsListThroughAxios() {
      const vue = this;

      return this.$axios
        .post("/api/products/", {
          login: this.$store.getters["auth/login"],
          pass: this.$store.getters["auth/pass"]
        })
        .catch(error => {
          vue.$buefy.toast.open({
            message: `Ошибка получения продуктов: ${error.response.toString()}`,
            type: "is-danger",
            duration: 6000,
            queue: false
          });
        });
    }
  }
};
