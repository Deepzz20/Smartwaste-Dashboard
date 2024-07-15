
// SmartWaste Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import typography from "assets/theme/base/typography";

// SmartWaste Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { light, text, dark } = colors;
const { borderRadius } = borders;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      transition: "background-color 300ms ease, color 300ms ease",

      // "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
      //   backgroundColor: light.main,
      //   color: dark.main,
      // },
    },
  },
};
