import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';

// SmartWaste Dashboard React components
import VuiButton from 'components/VuiButton';
import VuiTypography from 'components/VuiTypography';
import VuiBox from 'components/VuiBox';



export default function AccountPopover({ userDetails }) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleRouting = (destination) => {
        setOpen(null);
        // Navigate to the specified route when the MenuItem is clicked
        navigate(destination);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Use navigate to redirect to the "/login" route
        navigate('/login', { replace: true });
    };

    return (
        <>
            <IconButton
                size="large"
                onClick={handleOpen}
                sx={{
                    ...(open && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                    }),
                }}
            >
                <Icon>account_circle</Icon>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <>
                    <VuiBox sx={{ my: 1, px: 2 }}>
                        <VuiTypography variant="subtitle2" noWrap>
                            {userDetails.firstName + " " + userDetails.lastName}
                        </VuiTypography>
                        <VuiTypography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {userDetails.email}
                        </VuiTypography>
                    </VuiBox>

                    <Divider />

                    <MenuItem key="home" onClick={() => handleRouting('/dashboard')}>
                        Home
                    </MenuItem>

                    <MenuItem key="profile" onClick={() => handleRouting('/profile')}>
                        Profile
                    </MenuItem>

                    <Divider />

                    <MenuItem
                        disableRipple
                        disableTouchRipple
                        sx={{ p: 0 }}
                    >
                        <VuiButton color="error" fullWidth onClick={handleLogout}>
                            Log Out
                        </VuiButton>
                    </MenuItem>
                </>
            </Popover>
        </>
    );
}
