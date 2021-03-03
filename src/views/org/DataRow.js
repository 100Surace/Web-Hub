import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Checkbox,
  TableCell,
  TableRow,
  Typography,
  Input,
  makeStyles,
  ButtonGroup
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';

function validateData(data) {
  const validData = {};
  if (data.ids) validData.ids = data.ids;
  if (data.moduleName) validData.moduleName = data.moduleName;
  if (data.moduleCategoryName)
    validData.moduleCategoryName = data.moduleCategoryName;

  return validData;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const DataRow = ({
  updateData,
  rowData,
  selectedItems,
  handleSelectOne,
  deleteData,
  setSelectedItems,
  setSearchInput,
  setIsSorting,
  disableHover,
  setDisableHover,
  CustomTableCell
}) => {
  const data = validateData(rowData);
  const { addToast } = useToasts();

  const [input, setInput] = useState(data.moduleName);
  const [editing, setEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [editId, setEditId] = useState(0);

  const onEdit = (id) => {
    setInput(data.moduleName);
    setEditing(!editing);
    setDisableHover(true);
    setEditId(id);
  };

  const onEditCancel = () => {
    setInput(data.moduleName);
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const saveEditing = (id) => {
    updateData(id, { moduleName: input });
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
  };

  const onMouseEnterHandler = (e) => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = (e) => {
    setIsHover(false);
  };

  const deleteThis = (id) => {
    const onSuccess = () => {
      addToast('Delete successfully', { appearance: 'success' });
    };
    deleteData(id, onSuccess);

    setSelectedItems([]);
    setSearchInput('');
    setIsSorting(false);
  };
  return (
    <TableRow
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      hover
      key={data.ids}
      selected={selectedItems.indexOf(data.ids) !== -1}
      style={
        selectedItems.indexOf(data.ids) !== -1
          ? { background: 'rgba(255,0,0,0.1)' }
          : {}
      }
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(data.ids) !== -1 ? true : false}
          onChange={() => handleSelectOne(data.ids)}
          value="true"
        />
      </TableCell>
      <CustomTableCell
        dataRow={data}
        isEditMode={editing}
        onInputChange={onInputChange}
      />
      <TableCell align="right">
        {disableHover ? (
          editId === data.ids ? (
            <ButtonGroup>
              <CloseIcon onClick={() => onEditCancel(data.ids)} />
              <SaveIcon onClick={() => saveEditing(data.ids)} />
            </ButtonGroup>
          ) : (
            ''
          )
        ) : isHover ? (
          selectedItems.indexOf(data.ids) === -1 ? (
            <ButtonGroup>
              <EditIcon onClick={() => onEdit(data.ids)} />
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => deleteThis(data.ids)}
              />
            </ButtonGroup>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
};

DataRow.propTypes = {
  data: PropTypes.object
};

export default DataRow;
