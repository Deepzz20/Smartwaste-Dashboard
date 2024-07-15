import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import VuiTypography from 'components/VuiTypography';

// ----------------------------------------------------------------------

export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
            backgroundColor: "transparent !important",
            py: 9,
          }}
        >
          <VuiTypography variant="h6" paragraph>
            Not found
          </VuiTypography>

          <VuiTypography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </VuiTypography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
