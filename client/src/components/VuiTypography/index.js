
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for VuiTypography
import VuiTypographyRoot from "components/VuiTypography/VuiTypographyRoot";

const VuiTypography = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      fontSize,
      textGradient,
      opacity,
      children,
      ...rest
    },
    ref
  ) => (
    <VuiTypographyRoot
      {...rest}
      ref={ref}
      ownerState={{
        color,
        textTransform,
        verticalAlign,
        fontSize,
        fontWeight,
        opacity,
        textGradient,
      }}
    >
      {children}
    </VuiTypographyRoot>
  )
);

// Setting default values for the props of VuiTypography
VuiTypography.defaultProps = {
  color: "white",
  fontWeight: false,
  fontSize: "16px",
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

// Typechecking props for the VuiTypography
VuiTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
    "logo",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node,
  opacity: PropTypes.number,
  // variants : ['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2'];
};

export default VuiTypography;
