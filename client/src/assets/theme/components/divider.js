
// SmartWaste Dashboard React base styles
import colors from "assets/theme/base/colors";

// SmartWaste Dashboard React helper functions
import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

const { dark, transparent, white, info } = colors;

export default {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(info.main, 0)}, ${rgba(
        white.main,
        1
      )}, ${rgba(white.main, 0)}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(15)} 0`,
      borderBottom: "none",
      opacity: 0.5,
    },

    vertical: {
      backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${rgba(
        white.main,
        0.5
      )}, ${rgba(white.main, 0)}) !important`,
      width: pxToRem(1),
      height: "100%",
      margin: `0 ${pxToRem(16)}`,
      borderRight: "none",
    },
  },
};
