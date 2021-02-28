<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center text-center"
  >
    <div
      v-if="is_signup"
      class="fixed w-full flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 top-0"
      role="alert"
    >
      <svg
        class="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
        />
      </svg>
      <p>SignUp Success.</p>
    </div>

    <div
      class="sm:w-5/6 sm:h-5/6 md:w-4/6 md:h-4/6 lg:w-3/6 lg:h-3/6 xl:w-3/6 xl:h-3/6 rounded-2xl border-gray-500 border-4 flex flex-col items-center overflow-y-auto"
    >
      <div class="w-full flex flex-row mb-8">
        <div
          @click="doSwitchSignIn"
          :class="[
            'w-1/2',
            'h-16',
            'text-center',
            'text-2xl',
            'flex',
            type == 'signin' ? '' : 'bg-gray-500',
          ]"
        >
          <span class="m-auto">SignIn</span>
        </div>
        <div
          @click="doSwitchSignUp"
          :class="[
            'w-1/2',
            'h-16',
            'text-center',
            'text-2xl',
            'flex',
            type == 'signup' ? '' : 'bg-gray-500',
          ]"
        >
          <span class="m-auto">SignUp</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="英數5~10字元"
        class="w-4/6 mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
        v-model="user_name"
      />

      <input
        type="password"
        placeholder="英數5~50字元、允許部分特殊字元、開頭英文"
        v-model="user_pwd"
        class="w-4/6 mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
      />

      <input
        v-if="type == 'signup'"
        type="password"
        placeholder="確認密碼"
        v-model="user_pwd_2"
        class="w-4/6 mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
      />

      <button
        type="button"
        class="w-4/6 bg-blue-600 text-gray-200 rounded hover:bg-blue-500 px-4 py-2 focus:outline-none disabled:opacity-50"
        @click="doSign"
        :disabled="is_pending"
      >
        {{ this.type == "signin" ? "SignIn" : "SignUp" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      type: "signin",
      user_name: "",
      user_pwd: "",
      user_pwd_2: "",
      is_signup: false,
      is_pending: false,
    };
  },
  computed: mapState({
    info: (state) => state.info,
  }),
  methods: {
    ...mapActions([]),
    validUserName(val) {
      let pattern = new RegExp("^[a-zA-Z0-9]+$");
      if (val.length < 5 || val.length > 10) {
        return false;
      }
      return !!pattern.test(val);
    },
    validUserPwd(val) {
      let pattern = new RegExp(
        "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$"
      );
      return !!pattern.test(val);
    },
    doSwitchSignIn() {
      this.type = "signin";
    },
    doSwitchSignUp() {
      this.type = "signup";
    },
    doSign() {
      let url =
        this.type == "signin"
          ? this.$store.getters.url_signin
          : this.$store.getters.url_signup;

      if (
        (this.type == "signin" &&
          this.validUserName(this.user_name) &&
          this.validUserPwd(this.user_pwd)) ||
        (this.type == "signup" &&
          this.validUserName(this.user_name) &&
          this.validUserPwd(this.user_pwd) &&
          this.user_pwd == this.user_pwd_2)
      ) {
        this.is_pending = true;
        axios
          .post(url, { user_name: this.user_name, user_pwd: this.user_pwd })
          .then((res) => {
            if (res.data.result == true) {
              if (this.type == "signin") {
                this.$store.commit("saveInfo", {
                  info: { user_name: this.user_name, data: res.data },
                });
                this.$router.push("/home");
              } else {
                this.is_signup = true;
                this.user_name = "";
                this.user_pwd = this.user_pwd_2 = "";

                this.type = "signin";

                this.is_pending = false;
              }
            } else {
              alert(`${this.type} failed.`);
              this.is_pending = false;
            }
          });
      } else {
        alert("帳號或密碼驗證錯誤。");
        this.is_pending = false;
      }
    },
  },
  mounted() {},
  updated() {},
  watch: {
    info: function (news, olds) {
      if (news.user_name != null) {
        this.$router.push("/home");
      }
    },
  },
};
</script>