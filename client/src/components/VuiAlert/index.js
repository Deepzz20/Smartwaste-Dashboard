import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Fade from "@mui/material/Fade";

import { Alert} from "@mui/material";

const alertStyle = {
  position: 'fixed',
  bottom: "2%",
  right: 0,
  margin: '20px',
  zIndex: 1000,
  maxWidth: "75%"
};



function VuiAlert({ variant, dismissible, children, duration, onClose, show, isAbsolute }) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    setIsVisible(show);
    if (show && duration && dismissible) {
      setTimeoutId(setTimeout(() => {
        handleAlertClose();
      }, duration));
    }
  }, [show, duration, dismissible]);

  const handleAlertClose = () => {
    setIsVisible(false);
    onClose && onClose();
    clearTimeout(timeoutId);
  };

  return isVisible ? (
    <Fade in={isVisible} timeout={300}>
      <div style={isAbsolute ? alertStyle : ""}>
        <Alert
          variant="filled"
          severity={variant}
          sx={{ display: "flex", alignItems: "center", color: "white !important" }}
          onClose={dismissible ? handleAlertClose : undefined}
        >
          {children}
        </Alert>
      </div>
    </Fade>
  ) : null;
}

VuiAlert.defaultProps = {
  variant: "info",
  dismissible: false,
  duration: null,
  onClose: null,
  show: false,
  isAbsolute: true,
};

VuiAlert.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  isAbsolute: PropTypes.bool,
};

export default VuiAlert;
