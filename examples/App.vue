<template>
  <div id="app">
    <useYtRealCanvas ref="useYtRealCanvas" />
  </div>
</template>

<script>
import useYtRealCanvas from "./useYtRealCanvas/useYtRealCanvas.vue";
export default {
  name: "App",
  components: {useYtRealCanvas},
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
