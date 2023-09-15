<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column">
        <h1 class="title is-1">{{title}}</h1>
        <h2 class="subtitle has-text-info">
          ООО "ПНК"
        </h2>
      </div>
      <div class="column is-flex is-justify-content-flex-end" v-if="needLogin">
        <b-button
          size="is-large"
          :icon-left="loggedInIconStatus"
          :type="loggedInIconType"
          @click="isAOACLogin = true">
        </b-button>
      </div>
      <a-o-a-c-login :isAOACLogin="isAOACLogin" @closed="isAOACLogin=false"></a-o-a-c-login>
    </div>
  </section>
</template>

<script>
export default {
  props: ["title", "needLogin"],
  data() {
    return {
      isAOACLogin: false,
    }
  },
  computed: {
    loggedInIconStatus() {
      return this.$store.getters["auth/loggedIn"] ? "lock-check" : "lock-alert";
    },
    loggedInIconType() {
      return this.$store.getters["auth/loggedIn"] ? "is-success" : "is-danger";
    },
  }
}
</script>

<style scoped>

</style>
