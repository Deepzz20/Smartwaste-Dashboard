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
import SatisfactionRateOverview from 'examples/Graphs/SatisfactionRateOverview';
import IssueDetails from 'examples/Graphs/IssueDetails';
import TableData from 'examples/Table';
import Footer from 'examples/Footer';
import AddModal from 'examples/Modal/AddModal';

// React icons
import { FaPlus } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';

export default function Issues() {

  const [statisticsData, setStatisticsData] = useState({});
  const [issues, setIssues] = useState([]);
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

  // Function to get issues data
  const getIssues = async () => {
    try {
      const response = await axios.get('/issues/getAllIssues');
      setIssues(response.data);
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting issues data:', errorMessage);
      showAlert("error", `Error getting issues data: ${errorMessage}`);
    }
  };

  // Function to create a new issue
  const createIssue = async (newIssue) => {
    try {
      await axios.post('/issues/createNewIssue', newIssue);
      showAlert("success", "Issue created successfully");
      handleCloseModal();
      getIssues(); // Refresh issues data after creating a new issue
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error creating issue:', errorMessage);
      showAlert("error", `Error creating issue: ${errorMessage}`);
    }
  };

  // Function to edit an existing issue
  const editIssue = async (editedIssue) => {
    try {
      await axios.put(`/issues/updateIssue/${editedIssue._id}`, editedIssue);
      showAlert("success", "Issue updated successfully");
      getIssues(); // Refresh issues data after updating the issue
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error editing issue:', errorMessage);
      showAlert("error", `Error editing issue: ${errorMessage}`);
    }
  };

  // Function to delete an issue
  const deleteIssue = async (issueId) => {
    try {
      await axios.delete(`/issues/deleteIssue/${issueId}`);
      showAlert("success", "Issue deleted successfully");
      getIssues(); // Refresh issues data after deleting the issue
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error deleting issue:', errorMessage);
      showAlert("error", `Error deleting issue: ${errorMessage}`);
    }
  };

  useEffect(() => {
    getStatistics();
    getIssues();
  }, []);

  const columns = [
    { id: 'issueId', label: 'Issue ID', width: "10%" },
    { id: 'issueType', label: 'Issue Type', width: "10%" },
    { id: 'title', label: 'Title', width: "10%" },
    { id: 'description', label: 'Description', width: "10%" },
    { id: 'issueStatus', label: 'Status', width: "10%" },
    { id: 'fullName', label: 'Full Name', width: "10%" },
    { id: 'email', label: 'Email', width: "10%" },
    { id: 'phoneNumber', label: 'Phone Number', width: "10%" },
    { id: 'location', label: 'Location', width: "10%" },
  ];

  const fields = {
    issueType: "",
    title: "",
    description: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
  };


  const handleSubmit = (newIssue) => {
    createIssue(newIssue);
  };

  const handleEdit = (editedIssue) => {
    editIssue(editedIssue);
  };

  const handleDelete = (issueIdToDelete) => {
    deleteIssue(issueIdToDelete);
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
        <VuiBox py={3} mb={3}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Issues" }}
                count={statisticsData["openIssues"] + statisticsData["inProgressIssues"] + statisticsData["closedIssues"]}
                icon={{ color: "info", component: <IoWarning size="25px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Open Issues" }}
                count={statisticsData["openIssues"]}
                icon={{ color: "error", component: <IoWarning size="25px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "In Progress Issues" }}
                count={statisticsData["inProgressIssues"]}
                icon={{ color: "warning", component: <IoWarning size="25px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Closed Issues" }}
                count={statisticsData["closedIssues"]}
                icon={{ color: "success", component: <IoWarning size="25px" color="white" /> }}
              />
            </Grid>
          </Grid>

          <VuiBox my={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={7}>
                <SatisfactionRateOverview data={statisticsData} />
              </Grid>

              <Grid item xs={12} lg={6} xl={5}>
                <IssueDetails data={statisticsData} />
              </Grid>
            </Grid>
          </VuiBox>

          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center">
              <VuiTypography variant="lg" color="white">
                Issues
              </VuiTypography>
              <VuiButton color="success" startIcon={<FaPlus size="15px" color="inherit" />} onClick={handleOpenModal}>
                New Issues
              </VuiButton>
            </VuiBox>
            <TableData columns={columns} rows={issues} onEdit={handleEdit} onDelete={handleDelete} />
          </Card>
        </VuiBox>
      )}

      {showModal && (
        <AddModal title="Issue" fields={fields} onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}

      <Footer />
    </DashboardLayout>
  );
}
