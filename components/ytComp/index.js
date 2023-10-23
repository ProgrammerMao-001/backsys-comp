import ytComp from "./src/main.vue";

ytComp.install = (Vue) => {
  Vue.component(ytComp.name, ytComp);
};

export default ytComp;
