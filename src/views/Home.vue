<template>
  <div class="main">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="header">
      <div class="logo">LOGO</div>
      <div class="action">
        <div class="control">
          <div
            v-for="item in controlList"
            :key="item.key"
            v-html="item.ifMulState ? item.svg[item.value] : item.svg"
            :class="[
              'flex-center',
              'item',
              { active: item.key != 2 && item.ifMulState && item.value },
            ]"
            @click="control(item.key)"
          ></div>
        </div>
        <div class="voice flex-center">
          <div
            class="item flex-center"
            v-html="voiceList.svg[voiceList.value]"
            @click="voiceClick"
          ></div>
          <div class="slider">
            <el-slider
              v-model="voiceValue"
              :show-tooltip="false"
              @change="voiceChange"
            ></el-slider>
          </div>
        </div>
        <div>
          <div
            class="item flex-center"
            v-html="themeModeList.svg[colorMode]"
            @click="themeModeChange"
          ></div>
        </div>
      </div>
    </div>
    <div class="aside-left">
      <div
        v-for="item in contents"
        :key="item.key"
        :class="[
          'item',
          'flex-center',
          { active: $route.path.split('/')[1] == item.eName },
        ]"
        @click="contentsChange(item.key)"
      >
        <img :src="item.icon" />
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div class="aside-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref ,onMounted} from "vue";
import {
  controlList,
  voiceList,
  themeModeList,
  iconColor,
  contents,
} from "../common/config/config";
import { colorConfig, colorMode } from "../common/config/color";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const router = useRouter();
    //header音乐控制器（播放、暂停、上下首、循环模式）
    const control = (key) => {
      if (controlList.value[key].ifMulState) {
        controlList.value[key].value = !controlList.value[key].value;
      }
      console.log(controlList.value[key].name);
    };
    //默认音量值
    const voiceValue = ref(20);
    const voiceValueTemp = ref(voiceValue.value);
    //音量图标点击事件(静音与解除静音)
    const voiceClick = () => {
      voiceList.value = !voiceList.value;
      if (!voiceList.value) {
        //一键静音前记住当前音量
        voiceValueTemp.value = voiceValue.value;
        voiceValue.value = 0;
      } else {
        //恢复静音之前的音量
        voiceValue.value = voiceValueTemp.value;
      }
    };
    //音量调节
    const voiceChange = () => {
      voiceList.value = voiceValue.value == 0 ? false : true;
    };
    //主题模式切换
    const themeModeChange = () => {
      var ifLight = Boolean(colorMode.value === "light");
      colorMode.value = ifLight ? "dark" : "light";
      if (ifLight) {
        iconColorChange(controlList.value, "light", "dark");
        iconColorChange([voiceList, themeModeList], "light", "dark");
      } else {
        iconColorChange(controlList.value, "dark", "light");
        iconColorChange([voiceList, themeModeList], "dark", "light");
      }
      //切换主背景色
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--key", colorConfig[colorMode.value].bg);
      //切换head背景色
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--headbgKey", colorConfig[colorMode.value].headbg);
    };
    //切换图标颜色
    const iconColorChange = (list, oldColor, newColor) => {
      list.forEach((element) => {
        if (element.ifMulState) {
          for (let key in element.svg) {
            element.svg[key] = element.svg[key].replaceAll(
              colorConfig[oldColor].icon,
              colorConfig[newColor].icon
            );
          }
        } else {
          element.svg = element.svg.replace(
            colorConfig[oldColor].icon,
            colorConfig[newColor].icon
          );
        }
      });
    };
    //切换左侧目录
    const contentsChange = (key) => {
      router.push({ name:contents[key].eName });
    };
    onMounted(() => {
    });
    return {
      control,
      controlList,
      colorMode,
      colorConfig,
      voiceList,
      voiceClick,
      voiceValue,
      voiceValueTemp,
      voiceChange,
      themeModeList,
      themeModeChange,
      iconColor,
      iconColorChange,
      contents,
      contentsChange,
    };
  },
});
</script>

<style lang="scss" scope>
$modeColor: var(--key, #fff);
$themeColor: #fb233c;
$fontColor: #999;
$logoColor: #93939399;
$headbg: var(--headbgKey, #dddddd55);
$boxShadow: #bbbbbb88;
body {
  margin: 0;
  padding: 0;
  background: $modeColor;
  transition: background ease-in-out 0.8s;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  color: $fontColor;

  .header {
    z-index: 1000;
    position: absolute;
    width: 100%;
    background: $headbg;
    transition: background ease-in-out 0.8s;
    height: 40px;
    padding: 5px 0;
    box-shadow: 0px 0px 15px 5px $boxShadow;
    backdrop-filter: blur(10px);
    display: flex;
    line-height: 40px;
    .logo {
      text-align: center;
      width: 260px;
      padding: 0px 30px;
    }
    .action {
      padding: 0px 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .control {
        width: 250px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
      .voice {
        width: 120px;
        .slider {
          margin-left: 5px;
          width: 80px;
        }
      }
      .item {
        cursor: pointer;
        height: 32px;
        border-radius: 6px;
        transition: ease-in-out all 0.5s;
        &:hover {
          background: $boxShadow;
          border-radius: 6px;
          transform: scale(0.85);
        }
      }
    }
  }
  .aside-left {
    overflow: auto;
    width: 260px;
    padding: 80px 30px 10px;
    border-right: 1px solid $logoColor;
    .item {
      margin: 5px 0;
      padding: 5px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: ease-in-out all 0.5s;
      img {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }
      &:hover {
        background: $boxShadow;
      }
    }
  }
  .aside-right {
    flex: 1;
    overflow: auto;
    padding: 50px 30px 10px;
  }
}

.active {
  background: $boxShadow;
  border-radius: 6px;
}
.padding-t-50 {
  padding-top: 50px;
}
.margin-l-10 {
  margin-left: 10px;
}
.flex-center {
  display: flex;
  align-items: center;
}

// 背景流光动画
@keyframes streamer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

//流光设置
.setting {
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    150deg,
    #f52443,
    #2394ef,
    #99cccc,
    #ffcc99,
    #99cc99
  );
  background-size: 500%;
  animation: streamer 35s infinite;
  font-size: 40px;
  .text {
    color: #fff;
    text-shadow: 2px 2px 3px #555;
    font-weight: 600;
    letter-spacing: 4px;
  }
}

/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: rgba(255, 240, 240, 0.1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(10, 10, 10, 0.9);
  background-color: rgba(200, 200, 200, 0.8);
}

/*定义音量slider按钮大小+边框*/
.el-slider__button {
  width: 8px !important;
  height: 8px !important;
  border: 1px solid #ddd !important;
}
/*定义音量slider按钮位置*/
.el-slider__button-wrapper {
  top: -16px !important;
}
/*定义音量slider轨道未滑过部分宽度与颜色*/
.el-slider__runway {
  height: 3px !important;
  background-color: #dddddd99 !important;
}
/*定义音量slider轨道滑过部分宽度与颜色*/
.el-slider__bar {
  height: 3px !important;
  background-color: #fb233c !important;
}
</style>

