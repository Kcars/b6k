<template>
  <div class="w-full h-full flex flex-row justify-center items-center">
    <div
      class="w-4/6 h-3/6 rounded-2xl border-gray-500 border-4 flex flex-col justify-center items-center overflow-y-auto p-10"
    >
      <input
        type="text"
        placeholder="網址"
        class="w-4/6 mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
        v-model="item_url"
      />
      <input
        type="text"
        placeholder="標籤 ( 標籤1,標籤2,標籤3 )"
        class="w-4/6 mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
        v-model="text_tags"
      />

      <div class="flex flex-rowp space-x-5">
        <button
          type="button"
          class="w-1/2 bg-blue-600 text-gray-200 rounded hover:bg-blue-500 px-4 py-2 focus:outline-none disabled:opacity-50"
          @click="doAddBookMark"
          :disabled="is_pending"
        >
          確定
        </button>

        <button
          type="button"
          class="w-1/2 bg-blue-600 text-gray-200 rounded hover:bg-blue-500 px-4 py-2 focus:outline-none"
          @click="goHome"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      item_url: "",
      text_tags: "",
      is_pending: false,
    };
  },
  computed: mapState({
    info: (state) => state.info,
  }),
  methods: {
    ...mapActions([]),
    doAddBookMark() {
      let tags = this.text_tags.split(",");
      if (this.item_url != null && this.item_url.length > 8) {
        this.is_pending = true;
        axios
          .post(this.$store.getters.url_add, {
            item_url: this.item_url,
            tags,
            token: this.info.data.token,
          })
          .then((res) => {
            if (res.data.result) {
              this.$router.push("/home");
            } else {
              alert("add bookmark failed.");
              this.is_pending = false;
            }
          });
      } else {
        is_pending = false;
      }
    },
    goHome() {
      this.$router.push("/home");
    },
  },
  async mounted() {
    if (this.$route.params != null) {
      this.item_url = this.$route.params.item_url;
      this.text_tags = this.$route.params.tags;
    }
  },
};
</script>