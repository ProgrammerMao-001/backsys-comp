import ytPageComp from "./src/main.vue";

ytPageComp.install = (Vue) => {
  Vue.component(ytPageComp.name, ytPageComp);
};

export default ytPageComp;
