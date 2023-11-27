<template>
  <div id="app">
    <div v-if="isShow">
      <div>
        <el-form ref="form" :model="formData" label-width="90px" inline>
          <el-form-item label="选择组件：">
            <el-select
              v-model="formData.showPage"
              placeholder="选择需要展示的组件"
            >
              <el-option
                v-for="item in pageList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="container" v-if="formData.showPage === 'useYtRealCanvas'">
        <h3>useYtRealCanvas</h3>
        <useYtRealCanvas ref="useYtRealCanvas" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtFileUpload'">
        <h3>useYtFileUpload</h3>
        <useYtFileUpload ref="useYtFileUpload" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtForm'">
        <h3>useYtForm</h3>
        <useYtForm ref="useYtForm" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtTableBtn'">
        <h3>useYtTableBtn</h3>
        <useYtTableBtn ref="useYtTableBtn" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtIsShowForm'">
        <h3>useYtIsShowForm</h3>
        <useYtIsShowForm ref="useYtIsShowForm" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtTable'">
        <h3>useYtTable</h3>
        <useYtTable ref="useYtTable" />
      </div>

      <div class="container" v-if="formData.showPage === 'useYtPagination'">
        <h3>useYtPagination</h3>
        <useYtPagination ref="useYtPagination" />
      </div>
    </div>

    <div class="fullPage" v-if="!isShow">
      <useYtPageComp ref="useYtPageComp"></useYtPageComp>
    </div>
  </div>
</template>

<script>
import useYtFileUpload from "./useYtFileUpload/useYtFileUpload.vue";
import useYtRealCanvas from "./useYtRealCanvas/useYtRealCanvas.vue";
import useYtForm from "./useYtForm/useYtForm.vue";
import useYtTableBtn from "./useYtTableBtn/useYtTableBtn.vue";
import useYtIsShowForm from "./useYtIsShowForm/useYtIsShowForm.vue";
import useYtTable from "./useYtTable/useYtTable.vue";
import useYtPagination from "./useYtPagination/useYtPagination.vue";
import useYtPageComp from "./useYtPageComp/useYtPageComp.vue";

export default {
  name: "App",
  components: {
    useYtFileUpload,
    useYtRealCanvas,
    useYtForm,
    useYtTableBtn,
    useYtIsShowForm,
    useYtTable,
    useYtPagination,
    useYtPageComp,
  },
  computed: {
    isShow() {
      return this.formData.showPage !== "useYtPageComp";
    },
  },
  data() {
    return {
      formData: {
        showPage: "useYtPageComp",
      },
      pageList: [
        { value: "useYtFileUpload" },
        { value: "useYtRealCanvas" },
        { value: "useYtForm" },
        { value: "useYtTableBtn" },
        { value: "useYtIsShowForm" },
        { value: "useYtTable" },
        { value: "useYtPagination" },
        { value: "useYtPageComp" },
      ],
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
