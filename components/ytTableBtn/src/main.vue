<template>
  <div class="tableBtn">
    <div class="tableBtn-box">
      <div
          v-for="(item, index) in btnListNew"
          :key="index"
          :class="index === btnListNew.length - 1 ? 'lastBox' : 'tableBox'"
          :style="{ color: item.color }"
      >
        <!-- 有权限标识 -->
        <div
            v-if="item.hasPermi"
            :class="index === btnListNew.length - 1 ? 'disFlex' : 'hasPermClass'"
        >
          <div v-hasPermi="[item.hasPermi]" class="hasPermClass-box">
            <i :class="item.icon" />
          </div>
          <div v-if="deleteCom && item.name === '删除'">
            <component
                :is="deleteData"
                :is-table="false"
                :update-data="updateData"
                :auth_key="auth_key"
                :report_id="reportId"
                @sureData="submitForm"
            />
          </div>
          <div
              v-else
              class="hasPermClass-elseBox"
              @click="sendClick(item.name)"
              v-hasPermi="[item.hasPermi]"
          >
            {{ item.name }}
          </div>
        </div>

        <!-- 无权限标识 -->
        <div v-else class="disFlex">
          <div class="noPermClass">
            <i :class="item.icon" />
          </div>
          <div v-if="deleteCom && item.name === '删除'">
            <component
                :is="deleteData"
                :is-table="false"
                :update-data="updateData"
                :auth_key="auth_key"
                :report_id="reportId"
                @sureData="submitForm"
            />
          </div>
          <div class="noPermClassElse" v-else @click="sendClick(item.name)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ytTableBtn",
  props: [
    "btnList",
    "deleteCom",
    "updateData",
    "auth_key",
    "reportId",
    "isTable",
  ],
  data() {
    return {
      deleteData: null,
      btnListNew: [], // 最终具备权限的数组
    };
  },
  created() {
    // if (this.deleteCom) {
    //   this.deleteData = require("@/components/DataSwap/ChangeDelete/" +
    //       this.deleteCom +
    //       ".vue").default;
    // }
    this.btnList.forEach((item) => {
      if (this.$store.state.user.permissions.indexOf(item.hasPermi) !== -1) {
        this.btnListNew.push(item);
      }
    });
  },
  methods: {
    sendClick(name) {
      this.$emit("sonClick", name);
    },
    submitForm() {
      this.$emit("sureData", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.tableBtn {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lastBox {
      height: 36px;
      background: rgba(255, 255, 255, 0);
      border-radius: 4px;
      font-size: 16px;
      font-family: "MicrosoftYaHei-Bold, MicrosoftYaHei";
      font-weight: bold;
      line-height: 21px;
    }

    .tableBox {
      padding: 0 20px 0 0;
      height: 36px;
      background: rgba(255, 255, 255, 0);
      border-radius: 4px;
      font-size: 16px;
      font-family: "MicrosoftYaHei-Bold, MicrosoftYaHei";
      font-weight: bold;
      line-height: 21px;

      :after {
        content: "";
        height: 21px;
        width: 1px;
      }
    }

    .hasPermClass {
      border-right: 1px solid #eeeeee;
      display: flex;

      &-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 21px;

        i {
          margin-right: 4px;
        }
      }

      &-elseBox {
        margin-right: 18px;
        cursor: pointer;
      }
    }

    .noPermClass {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 21px;

      i {
        margin-right: 4px;
      }
    }

    .noPermClassElse {
      margin-right: 18px;
      cursor: pointer;
    }
  }
}

.disFlex {
  display: flex;
}
</style>
