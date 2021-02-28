<template>
  <router-view />
</template>

<script>
import { mapState, mapActions } from "vuex";

import Home from "./views/Home.vue";
import SignIn from "./views/SignIn.vue";
import Login from "./views/Login.vue";
import Add from "./views/Add.vue";
import QuickAdd from "./views/QuickAdd.vue";

export default {
  components: {
    Home,
    SignIn,
    Login,
    Add,
    QuickAdd
  },
  computed: mapState({
  }),
  methods: {
    ...mapActions([]),
  },
  async beforeCreate() {
    await this.$store.dispatch("start");
  },
  async mounted() {
  }
};
</script>