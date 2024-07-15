import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiAlert from "components/VuiAlert";
import VuiTypography from "components/VuiTypography";

// SmartWaste Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import { AccountProfileDetails } from "./components/accountSettings";
import { SettingsPassword } from "./components/passwordSettings";
import { DataDetails } from "./components/dataSettings";


export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [statisticsData, setStatisticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [forceRender, setForceRender] = useState(false);

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


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
    } else {
      axios.post('/admin/authenticate', { token })
        .then((response) => {
          if (response.status === 200) {
            // Authentication was successful
            setRememberMe(response.data.user.rememberMe);
            fetchUserDetailsByEmail(response.data.user.email);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);


  useEffect(() => {

    // Function to get statistics data
    const getStatistics = async () => {
      try {
        const response = await axios.get('/statistics/getStatistics');
        setStatisticsData(response.data);
      } catch (error) {
        const errorMessage = error.response.data || error.message || 'Unknown error occurred';
        console.error('Error getting statistics data:: ', errorMessage);
        showAlert("error", `Error getting statistics data: ${errorMessage}`);
      }
    };

    getStatistics();
  }, []);


  const fetchUserDetailsByEmail = async (email) => {
    try {
      const response = await axios.get(`/admin/getAdminUserByEmail/${email}`);

      if (response.status === 200) {
        setUserDetails(response.data);
      } else {
        console.error("Unexpected response:", response);
        showAlert('error', 'Unexpected response' + response);
      }
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error fetching user details: ', errorMessage);
      showAlert("error", `Error fetching user details: ${errorMessage}`);
    }
  };


  // Function to update account data
  const handleAccountEdit = async (updatedUser) => {
    try {
      const response = await axios.put(
        `/admin/updateAdminUser/${userDetails._id}`,
        updatedUser
      );

      if (response.status === 200) {
        showAlert('success', 'Admin profile updated successfully');
        const response = await axios.post("/admin/setToken", { ...updatedUser, rememberMe });

        if (response.status === 200) {
          const token = response.data;
          localStorage.setItem('token', token);
          setForceRender((prev) => !prev);
        }
        fetchUserDetailsByEmail(updatedUser.email);
      } else {
        console.error("Unexpected response:", response);
        showAlert('error', 'Unexpected response: ' + response);
      }
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error updating admin profile: ', errorMessage);
      showAlert("error", `Error updating admin profile: ${errorMessage}`);
    }
  };

  // Function to update password
  const handlePasswordEdit = async (updatedData) => {
    if (updatedData.password === updatedData.confirmPassword) {
      const updatedUser = { ...userDetails, ...updatedData, rememberMe };

      try {
        const response = await axios.put(
          `/admin/updateAdminUser/${updatedUser._id}`,
          updatedUser
        );

        if (response.status === 200) {
          showAlert('success', 'Password updated successfully');
          const response = await axios.post("/admin/setToken", updatedUser);

          if (response.status === 200) {
            const token = response.data;
            localStorage.setItem('token', token);
          }
          fetchUserDetailsByEmail(updatedUser.email);
        } else {
          console.error("Unexpected response:", response);
          showAlert('error', 'Unexpected response: ' + response);
        }
      } catch (error) {
        const errorMessage = error.response.data || error.message || 'Unknown error occurred';
        console.error('Error updating password:', errorMessage);
        showAlert('error', `Error updating password: ${errorMessage}`);
      }

    } else {
      console.error('Passwords don\'t match');
      showAlert('error', 'Passwords don\'t match');
    }
  };

  // Function to update statistics data
  const handleStatisticsEdit = async (updatedeStatisticsData) => {

    try {
      await axios.post('/statistics/updateStatistics', updatedeStatisticsData);
      showAlert('success', 'Statistics data updated successfully');
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error updating statistics data: ', errorMessage);
      showAlert("error", `Error updating statistics data: ${errorMessage}`);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar updateNavbar={forceRender} />

      {loading ? (
        <VuiBox display="flex" alignItems="center" justifyContent="center" sx={{ height: "80vh", width: "100%" }}>
          <CircularProgress color="inherit" size={45} thickness={5} />
        </VuiBox>
      ) : (
        <VuiBox display='flex' flexDirection='column' gap={3} py={3}>
          <AccountProfileDetails data={userDetails} onEdit={handleAccountEdit} />
          <SettingsPassword onEdit={handlePasswordEdit} />
          <DataDetails data={statisticsData} onEdit={handleStatisticsEdit} />
        </VuiBox>
      )}

      <VuiAlert
        variant={alertStatus.variant}
        dismissible={true}
        duration={4000}
        onClose={resetAlert}
        show={alertStatus.show}
      >
        <VuiTypography variant="h6">
          {alertStatus.text}
        </VuiTypography>
      </VuiAlert>
      <Footer />
    </DashboardLayout>
  );
}