<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="flex flex-row w-4/6 h-16 top-0 border-b-2 mb-5 border-gray-300">
      <div class="w-32 my-auto">
        <span class="text-2xl text-white">
          {{
            this.$store.state.info != null
              ? this.$store.state.info.user_name
              : ""
          }}</span
        >
      </div>
      <div class="flex flex-row w-full space-x-5">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
          @click="doAddBookMark"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Add Bookmark</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z"
              fill="black"
            />
            <path
              d="M11.25 14H12.75V11.75H15V10.25H12.75V8H11.25V10.25H9V11.75H11.25V14Z"
              fill="black"
            />
          </svg>
        </button>
        <input
          v-if="is_search"
          type="text"
          placeholder="搜尋標籤；用半型逗號分隔"
          class="w-4/6 h-4/6 my-auto px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
          v-model="text_search"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
          @click="doSearch"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0515 14.3208H15.8645L21 19.4666L19.4666 21L14.3208 15.8645V15.0515L14.0429 14.7633C12.8696 15.7719 11.3465 16.3791 9.68954 16.3791C5.99485 16.3791 3 13.3842 3 9.68954C3 5.99485 5.99485 3 9.68954 3C13.3842 3 16.3791 5.99485 16.3791 9.68954C16.3791 11.3465 15.7719 12.8696 14.7633 14.0429L15.0515 14.3208ZM5.05832 9.68954C5.05832 12.2521 7.12693 14.3208 9.68954 14.3208C12.2521 14.3208 14.3208 12.2521 14.3208 9.68954C14.3208 7.12693 12.2521 5.05832 9.68954 5.05832C7.12693 5.05832 5.05832 7.12693 5.05832 9.68954Z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      <div class="w-32 h-full">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          @click="doSignOut"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <title>SignOut</title>
            <path d="M3 3h8V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H3z" />
            <path d="M19 10l-6-5v4H5v2h8v4l6-5z" />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="w-4/6 h-5/6 flex flex-col mt-5 overflow-x-auto"
      @scroll="onItemScroll"
    >
      <h1 class="text-white text-2xl text-center" v-if="list.length == 0">
        尚無書籤
      </h1>
      <div
        class="w-full h-24 flex flex-row border-b-2 pb-3 mt-10 border-yellow-100"
        v-for="(item, index) in list"
        :key="index"
      >
        <div
          class="w-4/6 h-full flex flex-col justify-center items-center text-gray-200"
        >
          <div class="w-full h-4/6 truncate text-2xl">
            <a :href="item.item_url" target="_blank">{{ item.title }}</a>
          </div>

          <span class="w-full h-2/6 text-sm truncate">{{ item.item_url }}</span>
          <div
            class="w-full flex flex-row mt-2"
            v-if="item.tags.length > 0 && item.tags[0] != ''"
          >
            <span
              v-for="(tag, index) in item.tags"
              :key="index"
              class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-900 bg-yellow-100 rounded-full"
            >
              {{ tag }}</span
            >
          </div>
        </div>
        <div
          class="w-2/6 h-full flex flex-row justify-end items-center mr-5 space-x-5"
        >
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              @click="doUpsertItem(ev, item)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z"
                  fill="black"
                />
                <title>Edit Tags</title>
              </svg>
            </button>
          </div>

          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50"
              @click="deRemoveItem(ev, item)"
                :disabled="is_pending"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM11.3304 13.2934V11.1731H12.7406V13.2934H14.861L14.861 14.7036H12.7406V16.824H11.3304V14.7036L9.20511 14.7086V13.2984L11.3304 13.2934ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM16 9H8V19H16V9Z"
                  fill="black"
                />
                <title>Remove</title>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      text_search: "",
      first_update: false,
      is_search: false,
      search_tags: [],
      page: 1,
      list: [
      ],
       is_pending: false,
    };
  },
  computed: mapState({
    info: (state) => state.info,
  }),
  methods: {
    ...mapActions([]),
    doSignOut() {
      this.$store.commit("removeInfo");
      this.$router.push("/");
    },
    doAddBookMark() {
      this.$router.push("/add");
    },
    doUpsertItem(ev, item) {
      this.$router.push({
        name: "add",
        params: { item_url: item.item_url, tags: item.tags },
      });
    },
    deRemoveItem(ev, item) {
      this.is_pending = true ;
      axios
        .post(this.$store.getters.url_remove, {
          item_id: item.item_id,
          token: this.info.data.token,
        })
        .then((res) => {
          if (res.data.result) {
            this.doListBookMark();
          } else {
            alert("remove bookmark failed.");
          }
          this.is_pending = false;
        });
    },
    doListBookMark(is_append = false) {
      if (this.info != null) {
        console.log(`doListBookMark start.`);
        this.first_update = true;

        axios
          .post(this.$store.getters.url_list, {
            token: this.info.data.token,
            user_name: this.info.user_name,
            tags: this.search_tags,
            page: is_append ? this.page : null,
          })
          .then((res) => {
            if (res.data.list != null) {
              if (is_append) {
                this.list = this.list.concat(res.data.list);
              } else {
                this.list = res.data.list;
              }
            }
          });
      } else {
        console.log(`doListBookMark.abort: token null.`);
      }
    },
    doSearch() {
      if (this.is_search) {
        if (this.text_search == "" && this.text_search != null && this.text_search.length == 0) {
          this.is_search = false;
        } else {
          this.search_tags = this.text_search != null ? this.text_search.split(",") : [] ;
          this.doListBookMark();
        }
      } else {
        this.is_search = true;
      }
    },
    onItemScroll(ev) {
      if (
        ev.srcElement.offsetHeight + ev.srcElement.scrollTop >=
        ev.srcElement.scrollHeight
      ) {
        this.page++;
        this.doListBookMark(true);
        console.log(`scroll end.`);
      }
    },
  },
  async mounted() {
    this.doListBookMark();
  },
  updated() {
    if (this.info != null) {
      if (!this.first_update) {
        this.first_update = true;
        this.doListBookMark();
      }
    }
  },
};
</script>