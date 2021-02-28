import { createWebHashHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import Login from "../views/Login.vue";
import Add from "../views/Add.vue";
import QuickAdd from "../views/QuickAdd.vue";

const routes = [
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/signin",
        name: "signin",
        component: SignIn,
    },
    {
        path: "/",
        name: "login",
        component: Login,
    },
    ,
    {
        path: "/add",
        name: "add",
        component: Add,
    },
    {
        path: "/quickadd/:input_url",
        name: "quickadd",
        component: QuickAdd,
        props: true
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;