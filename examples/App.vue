<template>
  <div id="app">
    <h3> useYtRealCanvas </h3>
    <useYtRealCanvas ref="useYtRealCanvas" />
    <h3> useYtFileUpload </h3>
    <useYtFileUpload ref="useYtFileUpload" />
  </div>
</template>

<script>
import useYtFileUpload from "./useYtFileUpload/useYtFileUpload.vue";
import useYtRealCanvas from "./useYtRealCanvas/useYtRealCanvas.vue";
export default {
  name: "App",
  components: {
    useYtFileUpload,
    useYtRealCanvas,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
