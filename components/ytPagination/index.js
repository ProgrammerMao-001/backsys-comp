import ytPagination from "./src/main.vue";

ytPagination.install = (Vue) => {
  Vue.component(ytPagination.name, ytPagination);
};

export default ytPagination;
