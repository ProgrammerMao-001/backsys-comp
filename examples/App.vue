<template>
  <div id="app">
    <div class="container" v-if="showPage === 'useYtRealCanvas'">
      <h3>useYtRealCanvas</h3>
      <useYtRealCanvas ref="useYtRealCanvas" />
    </div>

    <div class="container" v-if="showPage === 'useYtFileUpload'">
      <h3>useYtFileUpload</h3>
      <useYtFileUpload ref="useYtFileUpload" />
    </div>

    <div class="container" v-if="showPage === 'useYtForm'">
      <h3>useYtForm</h3>
      <useYtForm ref="useYtForm" />
    </div>
  </div>
</template>

<script>
import useYtFileUpload from "./useYtFileUpload/useYtFileUpload.vue";
import useYtRealCanvas from "./useYtRealCanvas/useYtRealCanvas.vue";
import useYtForm from "./useYtForm/useYtForm.vue";
export default {
  name: "App",
  components: {
    useYtFileUpload,
    useYtRealCanvas,
    useYtForm,
  },
  data() {
    return {
      showPage: "useYtForm",
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  width: calc(100% - 12px);
}
</style>
