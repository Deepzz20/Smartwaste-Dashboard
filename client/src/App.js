import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// SmartWaste Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// SmartWaste Dashboard React themes
import theme from "assets/theme";

// SmartWaste Dashboard React routes
import routes from "routes";

// SmartWaste Dashboard React contexts
import { useUIController, setMiniSidenav } from "context";

export default function App() {
  const [controller, dispatch] = useUIController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      if (route.route && route.component) {
        return <Route key={route.key} path={route.route} element={<route.component />} />;
      }

      return null;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName={
              <h3>SMART WASTE<br />MANAGEMENT</h3>
            }
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
