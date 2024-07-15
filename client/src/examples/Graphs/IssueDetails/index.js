// @mui material components
import { Card } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Graph Data
import DonutChart from "examples/Charts/DonutChart/DonutChart";
import { issuesChartOptions } from "data/ChartOptions";

const updatedChartOptions = {
    ...issuesChartOptions,
    labels: ['Open', 'In Progress', 'Closed'],
};



export default function IssueDetails({ data }) {
    return (
        <Card>
            <VuiBox>
                <VuiTypography variant="lg" color="white" fontWeight="bold">
                    Issues Data (Monthly)
                </VuiTypography>
                <VuiBox sx={{ height: "250px" }}>
                    <DonutChart
                        chartData={[data["openIssues"], data["inProgressIssues"], data["closedIssues"]]}
                        chartOptions={updatedChartOptions}
                    />
                </VuiBox>
            </VuiBox>
        </Card>
    );
}