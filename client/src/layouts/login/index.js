import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";


// SmartWaste Dashboard React base styles and images
import borders from "assets/theme/base/borders";
import bgSignIn from "assets/images/signInImage.png";


// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiAlert from "components/VuiAlert";

// SmartWaste Dashboard React example components
import GradientBorder from "examples/GradientBorder";
import CoverLayout from "examples/LayoutContainers/CoverLayout";


import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";



export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [values, setValues] = useState({
    email: "try@gmail.com",
    password: "Try@123",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/admin/login", { ...values, rememberMe });

      if (response.status === 200) {
        const token = response.data;
        console.log(token);
        localStorage.setItem('token', token);
        showAlert('success', 'Login successful');
        setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data || 'Invalid credentials';
        showAlert('error', errorMessage);
      } else {
        showAlert('error', 'An unexpected error occurred');
      }
    }
  };


  const [alertStatus, setAlertStatus] = useState({
    show: false,
    variant: "info",
    text: "",
    duration: null,
  });

  const showAlert = (color, text, duration = null) => {
    setAlertStatus({
      show: true,
      variant: color,
      text: text,
      duration: duration,
    });
  };

  const resetAlert = () => {
    setAlertStatus({
      show: false,
      variant: "info",
      text: "",
      duration: null,
    });
  };

  return (
    <CoverLayout
      title="Login!"
      color="white"
      description="Enter your email and password to login."
      premotto="INSPIRED BY THE FUTURE:"
      motto="The SmartWaste Dashboard"
      image={bgSignIn}
      cardContent
    >
      <VuiBox display="flex" flexDirection="column" gap={3}>
        <VuiAlert
          variant={alertStatus.variant}
          dismissible={true}
          duration={4000}
          onClose={resetAlert}
          isAbsolute={false}
          show={alertStatus.show}
        >
          <VuiTypography variant="h6">
            {alertStatus.text}
          </VuiTypography>
        </VuiAlert>

        <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
          <VuiBox
            component="form"
            onSubmit={handleSubmit}
            borderRadius="inherit"
            p="45px"
            sx={({ palette: { secondary } }) => ({
              backgroundColor: secondary.focus,
            })}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              color="info"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              value={values.password}
              color="info"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      color={showPassword ? "info" : "white"}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <VuiBox display="flex" alignItems="center" mb={1}>
              <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
              <VuiTypography
                variant="caption"
                color="white"
                fontWeight="medium"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Remember me
              </VuiTypography>
            </VuiBox>

            <VuiButton color="info" fullWidth type="submit">
              LOGIN
            </VuiButton>
          </VuiBox>
        </GradientBorder>
      </VuiBox>
    </CoverLayout>
  );
}