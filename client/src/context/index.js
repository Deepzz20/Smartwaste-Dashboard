import { createContext, useContext, useReducer, useMemo, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The SmartWaste Dashboard  Material main context
const UI = createContext();

// Setting custom name for the context which is visible on react dev tools
UI.displayName = "UIContext";

// SmartWaste Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Function to retrieve user settings from local storage
const getSavedSettings = () => {
  const storedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
  const defaultSettings = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: 'info',
    transparentNavbar: true,
    fixedNavbar: true,
    layout: 'dashboard',
  };

  const newSettings = {
    ...defaultSettings,
    ...storedSettings,
    openConfigurator: false,
  };

  return newSettings;
};




// SmartWaste Dashboard React context provider
function UIControllerProvider({ children }) {

  const initialState = useMemo(() => getSavedSettings(), []);
  const [controller, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(controller));
  }, [controller]);

  return <UI.Provider value={[controller, dispatch]}>{children}</UI.Provider>;
}

// SmartWaste Dashboard React custom hook for using context
function useUIController() {
  const context = useContext(UI);

  if (!context) {
    throw new Error("useUIController should be used inside the UIControllerProvider.");
  }

  return context;
}

// Typechecking props for the UIControllerProvider
UIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });

export {
  UIControllerProvider,
  useUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setLayout,
};
