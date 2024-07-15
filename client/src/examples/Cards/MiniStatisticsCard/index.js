
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

export default function MiniStatisticsCard({ hasBorder, bgColor, title, count, icon, direction }) {

  return (
    <Card sx={{ padding: "15px 20px", borderWidth: "1px", borderColor: hasBorder ? "grey !important" : "transparent" }}>
      <VuiBox>
        <Grid container alignItems="center">
          {direction === "left" ? (
            <Grid item>
              <VuiBox
                bgColor={icon.color}
                color="#fff"
                width="3rem"
                height="3rem"
                borderRadius="lg"
                display="flex"
                justifyContent="center"
                alignItems="center"
                shadow="md"
              >
                {icon.component}
              </VuiBox>
            </Grid>
          ) : null}
          <Grid item xs={8}>
            <VuiBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
              <VuiTypography
                variant="button"
                color={bgColor === "white" ? "text" : "white"}
                opacity={bgColor === "white" ? 1 : 0.7}
                textTransform="capitalize"
                fontWeight={title.fontWeight}
              >
                {title.text}
              </VuiTypography>
              <VuiTypography variant="subtitle1" fontWeight="bold" color="white">
                {count}{" "}
              </VuiTypography>
            </VuiBox>
          </Grid>
          {direction === "right" ? (
            <Grid item xs={4}>
              <VuiBox
                bgColor={icon.color}
                color="white"
                width="3rem"
                height="3rem"
                marginLeft="auto"
                borderRadius="lg"
                display="flex"
                justifyContent="center"
                alignItems="center"
                shadow="md"
              >
                {icon.component}
              </VuiBox>
            </Grid>
          ) : null}
        </Grid>
      </VuiBox>
    </Card>
  );
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  hasBorder: false,
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
  hasBorder: PropTypes.bool,
};
