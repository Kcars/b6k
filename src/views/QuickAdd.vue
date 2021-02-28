<template>
  <div class="">{{ is_working ? "儲存中" : "" }}</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  props: ["input_url"],
  data() {
    return {
      is_working: false,
      item_url: "",
      text_tags: "",
    };
  },
  computed: mapState({
    info: (state) => state.info,
    loading: (state) => state.loading,
  }),
  methods: {
    ...mapActions([]),
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(str);
    },
    doAddBookMark() {
      let tags = this.text_tags.split(",");
      if (this.item_url != null && this.item_url.length > 8) {
        this.is_working = true;
        axios
          .post(this.$store.getters.url_add, {
            item_url: this.item_url,
            tags,
            token: this.info.data.token,
          })
          .then((res) => {
            if (res.data.result) {
              window.close();
            } else {
              alert("add bookmark failed.");
            }
          });
      }
    },
    goHome() {
      this.$router.push("/home");
    },
  },
  mounted() {},
  updated() {},
  watch: {
    loading(news, olds) {
      if (olds === true && news === false) {
        if (!this.validURL(this.input_url)) {
          alert("url failed");
        } else {
          this.item_url = this.input_url;
          this.doAddBookMark();
        }
      }
    },
  },
};
</script>