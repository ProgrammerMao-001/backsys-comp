import ytDemo from "./src/main.vue";

ytDemo.install = (Vue) => {
  Vue.component(ytDemo.name, ytDemo);
};

export default ytDemo;
