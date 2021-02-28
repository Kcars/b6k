import { createStore } from 'vuex'
import localforage from "localforage";

const TABLE_NAME = "b6k_user";

const store = createStore({
    state() {
        return {
            loading: true,
            info: null,
            api_prefix: "https://b6k-api.pickoma.com"
        }
    },
    mutations: {
        saveInfo(state, { info }) {
            let obj = JSON.stringify(info);

            state.info = info;
            state.loading = false;

            localforage.setItem(TABLE_NAME, obj, (err, res) => { });
        },
        removeInfo(state) {
            state.info = null;
            localforage.removeItem(TABLE_NAME, (err, res) => { });
        }
    },
    getters: {
        url_signup: state => `${state.api_prefix}/signup`,
        url_signin: state => `${state.api_prefix}/signin`,
        url_signout: state => `${state.api_prefix}/signout`,
        url_add: state => `${state.api_prefix}/add`,
        url_remove: state => `${state.api_prefix}/remove`,
        url_list: state => `${state.api_prefix}/list`,
    },
    actions: {
        async start(context) {
            let info = JSON.parse(await localforage.getItem(TABLE_NAME));

            if (info != null) {
                context.commit('saveInfo', { info });
                console.log(`storage loaded.`);
            }
        }
    },
})

export default store