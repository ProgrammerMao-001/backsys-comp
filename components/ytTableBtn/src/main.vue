<!--
 * @Description: ytTableBtn 自定义按钮组 页面
 * @Author: mhf
 * @Date: 2023/11/5 13:00
-->
<template>
  <div class="tableBtn">
    <div class="tableBtn-box">
      <div
        v-for="(item, index) in btnListNew"
        :key="index"
        :class="index === btnListNew.length - 1 ? 'lastBox' : 'tableBox'"
        :style="{ color: item.color }"
      >
        <div
          :class="index === btnListNew.length - 1 ? 'disFlex' : 'hasPermClass'"
        >
          <div class="hasPermClass-box">
            <i :class="item.icon" />
          </div>
          <div class="hasPermClass-elseBox" @click="sendClick(item.name)">
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
  props: {
    permiArr: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 权限数组，存放当前系统登陆人所具备的所有权限（通常存放在vuex中） demo: ["system:user:add", "system:user:update", "system:user:delete"]
    btnList: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 按钮数组 demo：[{name: "新增",icon: "el-icon-plus",color: "#1492FF",hasPermi: "system:user:resetPwd",}]
  },
  data() {
    return {
      btnListNew: [], // 最终具备权限的数组
    };
  },
  created() {
    if (this.btnList.length > 0 && this.btnList !== []) {
      let key = "hasPermi";
      let hasArr = [],
        hasNotArr = [];
      this.btnList.forEach((item) => {
        /* item 中具备 hasPermi 键 */
        if (key in item && this.permiArr.indexOf(item.hasPermi) !== -1) {
          hasArr.push(item);
        }
        /* hasPermi 不存在 */
        if (!(key in item)) hasNotArr.push(item);
      });
      this.btnListNew = hasArr.concat(hasNotArr);
      console.log(this.btnListNew);
    }
  },
  methods: {
    /**
     * @Event 将点击按钮类型传递给父组件
     * @description:
     * @author: mhf
     * @time: 2023-11-05 13:58:15
     **/
    sendClick(name) {
      this.$emit("sendClick", name);
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
