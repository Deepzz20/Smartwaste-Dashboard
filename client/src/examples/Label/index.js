import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';

// SmartWaste Dashboard React components
import VuiBox from 'components/VuiBox';

// ----------------------------------------------------------------------

const Label = forwardRef(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <VuiBox sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </VuiBox>}

        {children}

        {endIcon && <VuiBox sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </VuiBox>}
      </StyledLabel>
    );
  }
);

Label.propTypes = {
  children: PropTypes.node,
  endIcon: PropTypes.object,
  startIcon: PropTypes.object,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default Label;