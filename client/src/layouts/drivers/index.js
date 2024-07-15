import { useEffect, useState } from "react";
import { Card, CircularProgress, Grid } from '@mui/material';
import axios from "axios";

// SmartWaste Dashboard React components
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiButton from 'components/VuiButton';
import VuiAlert from "components/VuiAlert";

// SmartWaste Dashboard React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MiniStatisticsCard from 'examples/Cards/MiniStatisticsCard';
import AddModal from 'examples/Modal/AddModal';
import TableData from 'examples/Table';
import Footer from 'examples/Footer';

// React icons
import { FaPlus, FaTruck, FaUser } from 'react-icons/fa';

export default function Drivers() {

  const [statisticsData, setStatisticsData] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  // Function to get statistics data
  const getStatistics = async () => {
    try {
      const response = await axios.get('/statistics/getStatistics');
      setStatisticsData(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting statistics data:', errorMessage);
      showAlert("error", `Error getting statistics data: ${errorMessage}`);
      setLoading(false); // Set loading to false on error
    }
  };

  // Function to get drivers data
  const getDrivers = async () => {
    try {
      const response = await axios.get('/drivers/getAllDrivers');
      setDrivers(response.data);
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting drivers data:', errorMessage);
      showAlert("error", `Error getting drivers data: ${errorMessage}`);
    }
  };

  // Function to create a new driver
  const createDriver = async (newDriver) => {
    try {
      await axios.post('/drivers/createNewDriver', newDriver);
      showAlert("success", "Driver created successfully");
      handleCloseModal();
      getDrivers(); // Refresh drivers data after creating a new driver
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error creating driver:', errorMessage);
      showAlert("error", `Error creating driver: ${errorMessage}`);
    }
  };

  // Function to edit an existing driver
  const editDriver = async (editedDriver) => {
    try {
      await axios.put(`/drivers/updateDriver/${editedDriver._id}`, editedDriver);
      showAlert("success", "Driver updated successfully");
      getDrivers(); // Refresh drivers data after updating the driver
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error editing driver:', errorMessage);
      showAlert("error", `Error editing driver: ${errorMessage}`);
    }
  };

  // Function to delete a driver
  const deleteDriver = async (driverId) => {
    try {
      await axios.delete(`/drivers/deleteDriver/${driverId}`);
      showAlert("success", "Driver deleted successfully");
      getDrivers(); // Refresh drivers data after deleting the driver
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error deleting driver:', errorMessage);
      showAlert("error", `Error deleting driver: ${errorMessage}`);
    }
  };

  useEffect(() => {
    getStatistics();
    getDrivers();
  }, []);

  const columns = [
    { id: 'driverId', label: 'Driver ID', width: "15%" },
    { id: 'name', label: 'Name', width: "20%" },
    { id: 'email', label: 'Email', width: "20%" },
    { id: 'phoneNumber', label: 'Phone', width: "15%" },
    { id: 'location', label: 'Location', width: "15%" },
    { id: 'vehicleId', label: 'Vehicle ID', width: "15%" },
  ];

  const fields = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    vehicleId: "",
  };

  const handleSubmit = (newDriver) => {
    createDriver(newDriver);
  };

  const handleEdit = (editedDriver) => {
    editDriver(editedDriver);
  };

  const handleDelete = (driverIdToDelete) => {
    deleteDriver(driverIdToDelete);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

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

      {loading ? (
        <VuiBox display="flex" alignItems="center" justifyContent="center" sx={{ height: "80vh", width: "100%" }}>
          <CircularProgress color="inherit" size={45} thickness={5} />
        </VuiBox>
      ) : (
        <VuiBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Drivers" }}
                count={statisticsData["totalDrivers"]}
                icon={{ color: "dark", component: <FaUser size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Vehicles" }}
                count={statisticsData["totalVehicles"]}
                icon={{ color: "info", component: <FaTruck size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Active Vehicles" }}
                count={statisticsData["totalVehicles"] - statisticsData["repairedVehicles"]}
                icon={{ color: "success", component: <FaTruck size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Repaired Vehicles" }}
                count={statisticsData["repairedVehicles"]}
                icon={{ color: "error", component: <FaTruck size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>

          <VuiBox py={3} mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                <VuiTypography variant="lg" color="white">
                  Drivers
                </VuiTypography>
                <VuiButton color="success" startIcon={<FaPlus size="15px" color="inherit" />} onClick={handleOpenModal}>
                  New Drivers
                </VuiButton>
              </VuiBox>
              <TableData columns={columns} rows={drivers} onEdit={handleEdit} onDelete={handleDelete} />
            </Card>
          </VuiBox>
        </VuiBox>
      )}

      {showModal && (
        <AddModal title="Driver" fields={fields} onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}

      <Footer />
    </DashboardLayout>
  );
}
