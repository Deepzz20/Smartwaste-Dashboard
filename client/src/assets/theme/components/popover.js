
// SmartWaste Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

// SmartWaste Dashboard React base styles
import colors from "assets/theme/base/colors";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";

const { dark } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    paper: {
      backgroundColor: dark.body,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.lg,
    },
  },
};
