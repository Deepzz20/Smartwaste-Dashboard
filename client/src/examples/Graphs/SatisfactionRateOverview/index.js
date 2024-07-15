// @mui material components
import { Card } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Graph Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import { satisfactionRateChartOptions } from "data/ChartOptions";


export default function SatisfactionRateOverview({ data }) {

    const chartData = [
        {
            name: "Satisfaction Rate",
            data: data["satisfactionRateArray"],
        },
    ];


    return (
        <Card>
            <VuiBox sx={{ height: "100%" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold">
                    Satisfaction Rate Overview
                </VuiTypography>
                <VuiBox sx={{ height: "250px" }}>
                    <LineChart
                        chartData={chartData}
                        chartOptions={satisfactionRateChartOptions}
                    />
                </VuiBox>
            </VuiBox>
        </Card>
    );
}