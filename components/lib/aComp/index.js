import aComp from "./src/main.vue";

aComp.install = (Vue) => {
    Vue.component(aComp.name, aComp);
};

export default aComp;
