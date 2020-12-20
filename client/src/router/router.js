import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

//Components
import Index from "../components/Index"
import Chat from "../components/Chat"

const routes=[
    {path:"/",component:Index,name:"index"},
    {path:"/chat",component:Chat,name:"chat"}
]

export const router=new VueRouter({
    routes,
})


