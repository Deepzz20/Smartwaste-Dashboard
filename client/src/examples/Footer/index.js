
// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

export default function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="center"
      direction="row"
      component="footer"
    >
      <VuiTypography
        variant="button"
        sx={{ textAlign: "center", fontWeight: "400 !important" }}
        color="white"
      >
        @ 2023, Made with ❤️ by Vineet Kumar & Deepthi P
      </VuiTypography>
    </VuiBox>
  );
}
