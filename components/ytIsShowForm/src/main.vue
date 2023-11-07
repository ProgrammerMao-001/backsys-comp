<!--
 * @Description: 显示隐藏筛选框 组件
 * @Author: mhf
 * @Date: 2023-11-7 00:03:20
-->
<template>
  <div
      class="ytIsShowForm"
      :style="{color: showSearch ? `${hideSetting.color}` : `${showSetting.color}`}"
      @click="toggleSearch()"
      @mouseenter="changeColor('enter')"
      @mouseout="changeColor('out')"
  >
    {{ showSearch ? `${hideSetting.name}` : `${showSetting.name}` }}
    <i
        class="ytIsShowForm-icon"
        :style="{ color: showSearch ? `${hideSetting.color}` : `${showSetting.color}`}"
        :class="[showSearch ? `${hideSetting.icon}` : `${showSetting.icon}`]"
        @mouseenter="changeColor('enter')"
        @mouseout="changeColor('out')"
    ></i>
  </div>
</template>
<script>
export default {
  name: "ytIsShowForm",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    }, // 是否显示

    showSetting: {
      type: Object,
      default: () => {
        return {
          name: "显示筛选",
          icon: "iconfont ytUi-xianshi",
          color: "#1492ff"
        }
      }
    }, // 显示的配置项

    hideSetting: {
      type: Object,
      default: () => {
        return {
          name: "隐藏筛选",
          icon: "iconfont ytUi-yincang",
          color: "#999999"
        }
      }
    } // 隐藏的配置项
  },
  watch: {
    showSearch(newValue) {
      if (!newValue) {
        let box = document.querySelector(".ytIsShowForm")
        let icon = document.querySelector(".ytIsShowForm-icon")
        box.style.color = this.showSetting.color + "!important"
        icon.style.color = this.showSetting.color + "!important"
      }
    }
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    /**
     * @Event 更新显示隐藏的状态
     * @description:
     * @author: mhf
     * @time: 2023-11-07 23:58:38
     **/
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },

    changeColor(status) {
      let box = document.querySelector(".ytIsShowForm")
      let icon = document.querySelector(".ytIsShowForm-icon")
      if (status === 'enter') {
        this.$nextTick(() => {
          box.style.color = this.showSetting.color
          icon.style.color = this.showSetting.color
        })
      }

      if (status === 'out') {
        if (this.showSearch) {
          this.$nextTick(() => {
            box.style.color = this.hideSetting.color
            icon.style.color = this.hideSetting.color
          })
        } else {
          this.$nextTick(() => {
            box.style.color = this.showSetting.color
            icon.style.color = this.showSetting.color
          })
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.ytIsShowForm {
  display: flex;
  align-items: center;
  cursor: pointer;

  i {
    margin-left: 10px;
  }
}
</style>
