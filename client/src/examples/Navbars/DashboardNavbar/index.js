
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import { AppBar, Toolbar, Icon, IconButton, InputAdornment, OutlinedInput } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";

// SmartWaste Dashboard React example components
import Breadcrumbs from "examples/Breadcrumbs";
import AccountPopover from "examples/AccountPopUp";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow, navbarMobileMenu } from "examples/Navbars/DashboardNavbar/styles";

// SmartWaste Dashboard React context
import { useUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from "context";


export default function DashboardNavbar({ absolute, isMini, updateNavbar }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
    } else {
      axios.post('/admin/authenticate', { token })
        .then((response) => {
          if (response.status === 200) {
            // Authentication was successful
            console.log(response.data.message);
            setUserDetails(response.data.user);
          } else {
            // Authentication failed, navigate to the login page
            const errorMessage = response.data.message;
            console.error('Authentication failed:', errorMessage);
            alert(`Authentication failed:\n${errorMessage}`);
            navigate('/login', { replace: true });
          }
        })
        .catch((error) => {
          // Error occurred, navigate to the login page
          const errorMessage = error.response.data || error.message || 'Unknown error occurred';
          console.error('Authentication Error:', errorMessage);
          alert(`Authentication Error:\n${errorMessage}`);
          navigate('/login', { replace: true });
        });
    }
  }, [navigate, updateNavbar]);


  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    // The event listener that's calling the handleTransparentNavbar function when scrolling the window.
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const handleSearch = () => { };


  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} />
        </VuiBox>
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <OutlinedInput
              defaultValue=""
              placeholder="Search Here"
              startAdornment={(
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              )}
              color="info"
              size="small"
              sx={{ maxWidth: 500, borderRadius: 20, fontSize: 17 }}
            />

            <IconButton
              size="large"
              color="inherit"
              sx={navbarMobileMenu}
              onClick={handleMiniSidenav}
            >
              <Icon className={"text-white"}>{miniSidenav ? "menu_open" : "menu"}</Icon>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleConfiguratorOpen}
            >
              <Icon>settings</Icon>
            </IconButton>

            <AccountPopover userDetails={userDetails} />

          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  isMini: false,
  updateNavbar: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  isMini: PropTypes.bool,
  updateNavbar: PropTypes.bool,
};
