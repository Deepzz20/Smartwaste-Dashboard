
import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import { Icon, List, Divider, Link } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// SmartWaste Dashboard React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// SmartWaste Dashboard React context
import { useUIController, setMiniSidenav } from "context";

// SmartWaste icon
import logo from 'assets/images/logo.png'


export default function Sidenav({ color, brandName, routes, ...rest }) {
  const [controller, dispatch] = useUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    const handleMiniSidenav = () => {
      const newMiniSidenav = window.innerWidth < 1200;
      if (newMiniSidenav !== miniSidenav) {
        setMiniSidenav(dispatch, newMiniSidenav);
      }
    };

    window.addEventListener("resize", handleMiniSidenav);
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, miniSidenav]);



  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes
    .filter((route) => route.show)
    .map(({ name, icon, key, route }) => {
      return (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
          />
        </NavLink>
      );
    });


  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <VuiBox
        pt={3.5}
        pb={0.5}
        textAlign="center"
        sx={{ overflow: "unset !important" }}
      >
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>
        <VuiBox component={NavLink} to="/" display="flex" alignItems="center" justifyContent="center">
          <VuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              })
            }
          >
            <VuiBox
              display="flex"
              sx={(
                (theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                  { mr: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1, }
                )
              }
            >
              <img src={logo} height={70} width={70} alt="Logo" />
            </VuiBox>
            <VuiTypography
              variant="button"
              fontSize={14}
              letterSpacing={2}
              fontWeight="bold"
              color="white"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                })
              }
            >
              {brandName}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brandName: PropTypes.element,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

