import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";

// SmartWaste Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/MiniStatisticsCard";
import SatisfactionRate from "examples/Cards/SatisfactionRate";
import BinStatistics from "examples/Cards/BinStatistics";


// React icons
import { IoWarning } from "react-icons/io5";
import { FaTrash, FaTruck, FaUser } from "react-icons/fa";


// Graphs
import SatisfactionRateOverview from "examples/Graphs/SatisfactionRateOverview";
import IssueDetails from "examples/Graphs/IssueDetails";
import WeeklyUsers from "examples/Graphs/WeeklyUsers";
import MonthlyUsers from "examples/Graphs/MonthlyUsers";
import Map from "examples/Map";



export default function Dashboard() {

  const [statisticsData, setStatisticsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to get statistics data
  const getStatistics = async () => {
    try {
      const response = await axios.get('/statistics/getStatistics');
      setStatisticsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error getting statistics data:', error.response ? error.response.data : error.message);
      alert('Error getting statistics data:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {loading ? (
        <VuiBox display="flex" alignItems="center" justifyContent="center" sx={{ height: "80vh", width: "100%" }}>
          <CircularProgress color="inherit" size={45} thickness={5} />
        </VuiBox>
      ) : (

        <VuiBox py={3}>

          <VuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Registered Users" }}
                  count={statisticsData["registeredUser"]}
                  icon={{ color: "dark", component: <FaUser size="22px" color="white" /> }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Collected Bins" }}
                  count={statisticsData["collectedBins"]}
                  icon={{ color: "success", component: <FaTrash size="20px" color="white" /> }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Active Vehicles" }}
                  count={statisticsData["totalVehicles"] - statisticsData["repairedVehicles"]}
                  icon={{ color: "info", component: <FaTruck size="22px" color="white" /> }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Open Issues" }}
                  count={statisticsData["openIssues"]}
                  icon={{ color: "error", component: <IoWarning size="25px" color="white" /> }}
                />
              </Grid>
            </Grid>
          </VuiBox>

          <VuiBox mb={3}>
            <Grid container spacing="18px">

              <Grid item xs={12} lg={6} xl={4}>
                <SatisfactionRate data={statisticsData} />
              </Grid>

              <Grid item xs={12} lg={6} xl={8}>
                <BinStatistics data={statisticsData} />
              </Grid>

            </Grid>
          </VuiBox>

          <VuiBox mb={3}>
            <Grid container spacing={3}>

              <Grid item xs={12} lg={6} xl={5}>
                <WeeklyUsers data={statisticsData} />
              </Grid>

              <Grid item xs={12} lg={6} xl={7}>
                <MonthlyUsers data={statisticsData} />
              </Grid>

              <Grid item xs={12} lg={6} xl={7}>
                <SatisfactionRateOverview data={statisticsData} />
              </Grid>

              <Grid item xs={12} lg={6} xl={5}>
                <IssueDetails data={statisticsData} />
              </Grid>

            </Grid>
          </VuiBox>

          <Map />

        </VuiBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}