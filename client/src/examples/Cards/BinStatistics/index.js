// @mui material components
import { Card, Grid, CircularProgress } from '@mui/material';

// SmartWaste Dashboard React base styles
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';

// React icons
import { FaTrash } from 'react-icons/fa';

// SmartWaste Dashboard React components
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import MiniStatisticsCard from '../MiniStatisticsCard';


export default function BinStatistics({ data }) {
    const { gradients } = colors;

    return (
        <Card
            sx={{
                height: '100%',
                background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
            }}>
            <VuiBox sx={{ width: '100%' }}>
                <VuiTypography variant='lg' color='white' fontWeight='bold'>
                    Bin Statistics
                </VuiTypography>
                <VuiBox display='flex' flexDirection="column" justifyContent='center' alignItems='center' mt="10px" gap="10px"
                    sx={{ flexDirection: { md: "row" } }}
                >
                    <Grid container rowSpacing="10px" columnSpacing="25px">
                        <Grid item xs={12} md={12} xl={5}>
                            <MiniStatisticsCard
                                title={{ text: "Total Bins" }}
                                count={data["totalBins"]}
                                icon={{ color: "primary", component: <FaTrash size="20px" color="white" /> }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={5}>
                            <MiniStatisticsCard
                                title={{ text: "Empty Bins" }}
                                count={data["emptyBins"]}
                                icon={{ color: "success", component: <FaTrash size="20px" color="white" /> }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={5}>
                            <MiniStatisticsCard
                                title={{ text: "Half Bins" }}
                                count={data["halfBins"]}
                                icon={{ color: "warning", component: <FaTrash size="20px" color="white" /> }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={5}>
                            <MiniStatisticsCard
                                title={{ text: "Full Bins" }}
                                count={data["fullBins"]}
                                icon={{ color: "error", component: <FaTrash size="20px" color="white" /> }}
                            />
                        </Grid>
                    </Grid>
                    <VuiBox sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: "center",
                    }}>
                        <CircularProgress
                            variant='determinate'
                            value={70}
                            size={window.innerWidth >= 1024 ? 180 : 150}
                            color='success'
                        />
                        <VuiBox
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: "absolute"
                            }}>
                            <VuiBox display='flex' flexDirection='column' width="100%">
                                <VuiTypography color='text' variant='button' mb='4px'>
                                    Collection Rate
                                </VuiTypography>
                                <VuiTypography
                                    color='white'
                                    fontWeight='bold'>
                                    {data["collectionRate"]}%
                                </VuiTypography>
                            </VuiBox>
                        </VuiBox>
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </Card>
    );
}
