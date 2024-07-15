// @mui material components
import { Card } from "@mui/material";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// SmartWaste Dashboard React base styles
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";

// Graph Data
import BarChart from "examples/Charts/BarCharts/BarChart";
import { usersMonthlyChartOptions } from "data/ChartOptions";

const { gradients } = colors;
const { cardContent } = gradients;


export default function MonthlyUsers({ data }) {

    const chartData = [
        {
            name: "Users",
            data: data["activeUsersMonthlyArray"],
        },
    ];

    return (
        <Card>
            <VuiBox>
                <VuiTypography variant="lg" color="white" fontWeight="bold">
                    Active Users (Monthly)
                </VuiTypography>
                <VuiBox
                    mt={2}
                    sx={{
                        background: linearGradient(
                            cardContent.main,
                            cardContent.state,
                            cardContent.deg
                        ),
                        borderRadius: "20px",
                        height: "275px",
                    }}>
                    <BarChart
                        chartData={chartData}
                        chartOptions={usersMonthlyChartOptions}
                    />
                </VuiBox>
            </VuiBox>
        </Card>
    );
}