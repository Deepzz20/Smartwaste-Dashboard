import React from 'react';

import { Card } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// SmartWaste Dashboard React base styles
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';


// SmartWaste Dashboard React components
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';

// React icons
import { IoHappy } from 'react-icons/io5';



export default function SatisfactionRate({ data }) {
    const { info, gradients } = colors;
    const { cardContent } = gradients;

    return (
        <Card sx={{ height: '280px' }} >
            <VuiBox display='flex' flexDirection='column'>
                <VuiTypography variant='lg' color='white' fontWeight='bold' mb="20px">
                    Satisfaction Rate
                </VuiTypography>
                <VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
                    <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant='determinate' value={90 / 2} size={170} color='success' sx={{ transform: "Rotate(-180deg) !important" }} />
                        <VuiBox
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <VuiBox
                                sx={{
                                    background: info.main,
                                    transform: 'translateY(-50%)',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <IoHappy size='30px' color='#fff' />
                            </VuiBox>
                        </VuiBox>
                    </VuiBox>
                </VuiBox>
                <VuiBox
                    sx={({ breakpoints }) => ({
                        width: '90%',
                        padding: '18px 22px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        height: '82px',
                        mx: 'auto',
                        borderRadius: '20px',
                        background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                        transform: 'translateY(-100%)',
                        zIndex: '1000'
                    })}>
                    <VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
                        0%
                    </VuiTypography>
                    <VuiBox
                        flexDirection='column'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ minWidth: '80px' }}>
                        <VuiTypography color='white' variant='h3'>
                            {data["satisfactionRateArray"][11]}%
                        </VuiTypography>
                        <VuiTypography color='text' variant='caption' fontWeight='regular'>
                            Based on feedbacks
                        </VuiTypography>
                    </VuiBox>
                    <VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
                        100%
                    </VuiTypography>
                </VuiBox>
            </VuiBox>
        </Card >
    );
};