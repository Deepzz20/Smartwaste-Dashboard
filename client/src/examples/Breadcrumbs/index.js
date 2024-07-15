
// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

export default function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
    <VuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <VuiTypography
            variant="h4"
            color={"white"}
            opacity={0.8}
          >
            <Icon>{icon}</Icon>
          </VuiTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <VuiTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={"white"}
              opacity={0.8}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </VuiTypography>
          </Link>
        ))}
        <VuiTypography
          fontWeight="bold"
          textTransform="capitalize"
          variant="h5"
          color={"white"}
          noWrap
        >
          {title.replace("-", " ")}
        </VuiTypography>
      </MuiBreadcrumbs>

    </VuiBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};