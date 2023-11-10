import ytTable from "./src/main.vue";

ytTable.install = (Vue) => {
  Vue.component(ytTable.name, ytTable);
};

export default ytTable;
