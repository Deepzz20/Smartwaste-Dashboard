import { useState } from 'react';
import { Card, CardActions, CardContent, Divider, Modal, Popover, MenuItem, Checkbox, TableRow, TableCell, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

// SmartWaste Dashboard React components
import VuiButton from 'components/VuiButton';
import VuiTypography from 'components/VuiTypography';

// SmartWaste Dashboard React example components
import EditModal from 'examples/Modal/EditModal';

// React icons
import { FaEllipsisV, FaTrash, FaUserEdit } from 'react-icons/fa';

import renderTableCellContent from './tablecell-render';


const alertDialogStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black !important',
  border: '2px solid grey',
  boxShadow: 24,
  p: 3,
};


// ----------------------------------------------------------------------

export default function UserTableRow({ selected, data, handleClick, onEdit, onDelete }) {
  const [showOptions, setShowOptions] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleOpenOptions = (event) => {
    setShowOptions(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setShowOptions(null);
  };


  const handleOpenModal = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleOpenAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const handleEdit = () => {
    handleOpenModal();
    setShowOptions(null);
  };

  const handleDelete = () => {
    handleOpenAlert();
    setShowOptions(null);
  };

  const handleEditSubmit = (values) => {
    onEdit(values);
  };

  const handleDeleteSubmit = () => {
    const idToDelete = data._id; // Assuming the _id property is directly in the data object
    onDelete(idToDelete);
    handleCloseAlert();
  };

  const propertiesToSkip = ['_id', '__v', 'password', 'pastFillLevels'];

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" size="small">
          <Checkbox disableRipple checked={selected} onChange={handleClick} color='info' />
        </TableCell>

        {
          Object.keys(data)
            .filter((key) => !propertiesToSkip.includes(key))
            .map((key) => (
              <TableCell key={key} sx={{ maxWidth: "400px" }}>
                {renderTableCellContent(key, data[key])}
              </TableCell>
            ))
        }

        <TableCell align="right" size="small">
          <IconButton onClick={handleOpenOptions}>
            <FaEllipsisV size="15px" color="white" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!showOptions}
        anchorEl={showOptions}
        onClose={handleCloseOptions}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit} sx={{ display: "flex", gap: 1, height: 40 }}>
          <FaUserEdit size="15px" color="inherit" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main', display: "flex", gap: 1, height: 40 }}>
          <FaTrash size="15px" color="inherit" />
          Delete
        </MenuItem>
      </Popover>

      {showEditModal && (
        <EditModal title="User" fields={data} onSubmit={handleEditSubmit} onClose={handleCloseModal} />
      )}

      {/* Delete confirmation Dialog */}
      <Modal
        open={showAlert}
        onClose={handleCloseAlert}
      >
        <Card sx={alertDialogStyle}>
          <VuiTypography variant="h5">
            Confirm Delete
          </VuiTypography>

          <Divider />

          <CardContent>
            <VuiTypography>
              Are you sure you want to delete this item?
            </VuiTypography>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <VuiButton variant="outlined" color="white" onClick={handleCloseAlert}>Cancel</VuiButton>
            <VuiButton color="error" onClick={handleDeleteSubmit}>Delete</VuiButton>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.any,
  handleClick: PropTypes.func,
  data: PropTypes.object,
};
