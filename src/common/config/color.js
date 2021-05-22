import { ref,reactive } from "vue";
export const colorMode = ref("light")
export const colorConfig = reactive({
  themeColor: "#FB233C",
  light: {
    headbg:'dddddd55',
    bg: "#fff",
    icon: "#93939399",
  },
  dark: {
    headbg:'#55555599',
    bg: "#000",
    icon: "#eeeeee99",
  },
});
