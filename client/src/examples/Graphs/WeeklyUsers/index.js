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
import { usersWeeklyChartOptions } from "data/ChartOptions";


const { gradients } = colors;
const { cardContent } = gradients;


export default function WeeklyUsers({ data }) {

    const chartData = [
        {
            name: "Users",
            data: data["activeUsersWeeklyArray"],
        },
    ];

    return (
        <Card>
            <VuiBox>
                <VuiTypography variant="lg" color="white" fontWeight="bold">
                    Active Users (Weekly)
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
                    }}
                >
                    <VuiBox sx={{ height: "275px" }}>
                        <BarChart
                            chartData={chartData}
                            chartOptions={usersWeeklyChartOptions}
                        />
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </Card>
    );
}