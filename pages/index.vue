<template>
  <div class="container">
    <title-with-a-o-a-c-login title="Ручной генератор" :needLogin="true"></title-with-a-o-a-c-login>

    <select-driver></select-driver>

    <get-client v-if="isLoggedIn && driverReady" @changePage="page='keypair'"></get-client>

    <token-dashboard v-if="page === 'keypair' && isLoggedIn"></token-dashboard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: undefined,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
    driverReady() {
      return this.$store.getters["driver/ready"];
    }
  }
}
</script>

