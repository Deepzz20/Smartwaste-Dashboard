import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';


import { FaSearch, FaTrash } from 'react-icons/fa';
import { InputAdornment, OutlinedInput } from '@mui/material';
import VuiTypography from 'components/VuiTypography';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterChange }) {
  return (
    <Toolbar
      sx={{
        height: 96,
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {numSelected > 0 ? (
        <VuiTypography variant="subtitle2">
          {numSelected} selected
        </VuiTypography>
      ) : (
        <OutlinedInput
          fullWidth
          defaultValue=""
          placeholder="Search Table..."
          startAdornment={(
            <InputAdornment position="start">
              <FaSearch size="15px" />
            </InputAdornment>
          )}
          color="info"
          size="small"
          sx={{ maxWidth: 500, borderRadius: 20, fontSize: 17 }}
          value={filterName}
          onChange={onFilterChange}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <FaTrash size="20px" color="red" />
          </IconButton>
        </Tooltip>
      ) : null
      }
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterChange: PropTypes.func,
};
