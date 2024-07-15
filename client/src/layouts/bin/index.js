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
import BinStatistics from 'examples/Cards/BinStatistics';
import MiniStatisticsCard from 'examples/Cards/MiniStatisticsCard';
import AddModal from 'examples/Modal/AddModal';
import TableData from 'examples/Table';
import Footer from 'examples/Footer';

// React icons
import { FaPlus, FaTrash } from 'react-icons/fa';


export default function Bins() {

  const [statisticsData, setStatisticsData] = useState({});
  const [bins, setBins] = useState([]);
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

  // Function to get bins data
  const getBins = async () => {
    try {
      const response = await axios.get('/bins/getAllBins');
      setBins(response.data);
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error getting bins data:', errorMessage);
      showAlert("error", `Error getting bins data: ${errorMessage}`);
    }
  };

  // Function to create a new bin
  const createBin = async (newBin) => {
    try {
      await axios.post('/bins/createNewBin', newBin);
      showAlert("success", "Bin created successfully");
      handleCloseModal();
      getBins(); // Refresh bins data after creating a new bin
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error creating bin:', errorMessage);
      showAlert("error", `Error creating bin: ${errorMessage}`);
    }
  };

  // Function to edit an existing bin
  const editBin = async (editedBin) => {
    try {
      await axios.put(`/bins/updateBin/${editedBin._id}`, editedBin);
      showAlert("success", "Bin updated successfully");
      getBins(); // Refresh bins data after updating the bin
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error editing bin:', errorMessage);
      showAlert("error", `Error editing bin: ${errorMessage}`);
    }
  };

  // Function to delete a bin
  const deleteBin = async (binId) => {
    try {
      await axios.delete(`/bins/deleteBin/${binId}`);
      showAlert("success", "Bin deleted successfully");
      getBins(); // Refresh bins data after deleting the bin
    } catch (error) {
      const errorMessage = error.response.data || error.message || 'Unknown error occurred';
      console.error('Error deleting bin:', errorMessage);
      showAlert("error", `Error deleting bin: ${errorMessage}`);
    }
  };

  useEffect(() => {
    getStatistics();
    getBins();
  }, []);


  const columns = [
    { id: 'binId', label: 'Bin ID', width: "15%" },
    { id: 'location', label: 'Location', width: "20%" },
    { id: 'coordinates', label: 'Co-ordinates', width: "20%" },
    { id: 'issues', label: 'Issues', width: "10%" },
    { id: 'binSize', label: 'Bin Size', width: "15%" },
    { id: 'binLevel', label: 'Bin Level', width: "20%" },
  ];


  const fields = {
    location: "",
    xCoordinate: "",
    yCoordinate: "",
    binSize: "",
  };

  const handleSubmit = (values) => {
    const additionalFields = {
      coordinates: values.xCoordinate + ", " + values.yCoordinate,
    };

    const newBin = { ...values, ...additionalFields };
    createBin(newBin);
  };

  const handleEdit = (editedBin) => {
    editBin(editedBin);
  };

  const handleDelete = (binIdToDelete) => {
    deleteBin(binIdToDelete);
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
        <VuiBox py={3} mb={3} display="flex" flexDirection="column" gap={3}>

          <Grid container spacing="20px">
            <Grid item xs={12} lg={12} xl={8}>
              <BinStatistics data={statisticsData} />
            </Grid>
            <Grid item xl={4}>
              <Card sx={{ height: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} xl={12}>
                    <VuiTypography variant='lg' color='white' fontWeight='bold'>
                      Current Day Bin Data
                    </VuiTypography>
                  </Grid>

                  <Grid item xs={12} md={6} xl={12}>
                    <MiniStatisticsCard
                      title={{ text: "Collected Bins" }}
                      count={statisticsData["collectedBins"]}
                      icon={{ color: "info", component: <FaTrash size="20px" color="white" /> }}
                      hasBorder
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={12}>
                    <MiniStatisticsCard
                      title={{ text: "Uncollected Bins" }}
                      count={statisticsData["totalBins"] - statisticsData["collectedBins"]}
                      icon={{ color: "error", component: <FaTrash size="20px" color="white" /> }}
                      hasBorder
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center">
              <VuiTypography variant="lg" color="white">
                Bins
              </VuiTypography>
              <VuiButton color="success" startIcon={<FaPlus size="15px" color="inherit" />} onClick={handleOpenModal}>
                New Bins
              </VuiButton>
            </VuiBox>
            <TableData columns={columns} rows={bins} onEdit={handleEdit} onDelete={handleDelete} />
          </Card>
        </VuiBox>
      )}

      {showModal && (
        <AddModal title="Bin" fields={fields} onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}

      <Footer />
    </DashboardLayout>
  );
}
