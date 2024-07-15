import { useEffect, useState } from "react";
import { Card, CircularProgress, Grid } from '@mui/material';
import axios from "axios";

// SmartWaste Dashboard React components
import VuiButton from 'components/VuiButton';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiAlert from "components/VuiAlert";

// SmartWaste Dashboard React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import WeeklyUsers from 'examples/Graphs/WeeklyUsers';
import MonthlyUsers from 'examples/Graphs/MonthlyUsers';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import TableData from 'examples/Table';
import AddModal from 'examples/Modal/AddModal';
import Footer from 'examples/Footer';

// React icons
import { FaPlus } from 'react-icons/fa';

export default function Users() {
  const [statisticsData, setStatisticsData] = useState({});
  const [users, setUsers] = useState([]);
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

  const getStatistics = async () => {
    try {
      const response = await axios.get('/statistics/getStatistics');
      setStatisticsData(response.data);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting statistics data:', errorMessage);
      showAlert("error", `Error getting statistics data: ${errorMessage}`);
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('/users/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting users data:', errorMessage);
      showAlert("error", `Error getting users data: ${errorMessage}`);
    }
  };

  useEffect(() => {
    getStatistics();
    getUsers();
  }, []);

  const columns = [
    { id: 'userId', label: 'User ID', width: "15%" },
    { id: 'name', label: 'Name', width: "20%" },
    { id: 'email', label: 'Email', width: "20%" },
    { id: 'phoneNumber', label: 'Phone', width: "20%" },
    { id: 'location', label: 'Location', width: "15%" },
    { id: 'issues', label: 'Issues', width: "10%" },
  ];

  const fields = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
  };

  const handleSubmit = async (newUser) => {
    try {
      await axios.post('/users/createNewUser', newUser);
      showAlert("success", "User created successfully");
      handleCloseModal();
      getUsers(); // Refresh users data after creating a new user
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error creating user:', errorMessage);
      showAlert("error", `Error creating user: ${errorMessage}`);
    }
  };

  const handleEdit = async (editedUser) => {
    try {
      await axios.put(`/users/updateUser/${editedUser._id}`, editedUser);
      showAlert("success", "User updated successfully");
      getUsers(); // Refresh users data after updating the user
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error editing user:', errorMessage);
      showAlert("error", `Error editing user: ${errorMessage}`);
    }
  };

  const handleDelete = async (userIdToDelete) => {
    try {
      await axios.delete(`/users/deleteUser/${userIdToDelete}`);
      showAlert("success", "User deleted successfully");
      getUsers(); // Refresh users data after deleting the user
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error deleting user:', errorMessage);
      showAlert("error", `Error deleting user: ${errorMessage}`);
    }
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
            <Grid item xs={12} lg={6} xl={5}>
              <WeeklyUsers data={statisticsData} />
            </Grid>
            <Grid item xs={12} lg={6} xl={7}>
              <MonthlyUsers data={statisticsData} />
            </Grid>
          </Grid>

          <VuiBox py={3} mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                <VuiTypography variant="lg" color="white">
                  Users
                </VuiTypography>
                <VuiButton color="success" startIcon={<FaPlus size="15px" color="inherit" />} onClick={handleOpenModal}>
                  New User
                </VuiButton>
              </VuiBox>
              <TableData columns={columns} rows={users} onEdit={handleEdit} onDelete={handleDelete} />
            </Card>
          </VuiBox>
        </VuiBox>
      )}

      {showModal && (
        <AddModal title="User" fields={fields} onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}

      <Footer />
    </DashboardLayout>
  );
}
