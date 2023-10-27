<template>
  <div id="app">
    <useYtFileUpload ref="useYtFileUpload" />
  </div>
</template>

<script>
import useYtFileUpload from "./useYtFileUpload/useYtFileUpload.vue";
export default {
  name: "App",
  components: { useYtFileUpload },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
