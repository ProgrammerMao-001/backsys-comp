import ytRealCanvas from "./src/main.vue";

ytRealCanvas.install = (Vue) => {
  Vue.component(ytRealCanvas.name, ytRealCanvas);
};

export default ytRealCanvas;
