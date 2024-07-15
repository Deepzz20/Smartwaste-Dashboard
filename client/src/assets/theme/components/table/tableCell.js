
// SmartWaste Dashboard React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// SmartWaste Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderWidth } = borders;
const { light, dark } = colors;

export default {
  styleOverrides: {
    root: {
      backgroundColor: `${dark.focus} !important`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
      color: "white !important",
    },
  },
};
