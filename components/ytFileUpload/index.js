import ytFileUpload from "./src/main.vue";

ytFileUpload.install = (Vue) => {
  Vue.component(ytFileUpload.name, ytFileUpload);
};

export default ytFileUpload;
