import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Checkbox,
  TableCell,
  TableRow,
  makeStyles,
  ButtonGroup
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
  setDeletId,
  setConfirmDeleteModal,
  disableHover,
  setDisableHover,
  CustomTableCell,
  modulesList
}) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [editId, setEditId] = useState(0);
  const [formValue, setFormValue] = useState({});
  const [originalValue, setOriginalFormVal] = useState();

  const onEdit = (id) => {
    setFormValue(originalValue);
    setEditing(!editing);
    setDisableHover(true);
    setEditId(id);
  };

  const onEditCancel = () => {
    setFormValue(originalValue);
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setFormValue({ ...formValue, [e.target.name]: value });
  };
  const saveEditing = (id) => {
    // gets slected moduleName from id
    const module = modulesList.filter(
      (module) => module.ids === formValue.moduleId
    )[0];
    updateData(id, { ...formValue, moduleName: module.moduleName });
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
    // set state with updated moduleName
    setFormValue({ ...formValue, moduleName: module.moduleName });
  };

  const onMouseEnterHandler = (e) => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = (e) => {
    setIsHover(false);
  };

  const deleteThis = (id) => {
    setDeletId(id);
    setConfirmDeleteModal(true);
  };
  return (
    <TableRow
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      hover
      key={rowData.ids}
      selected={selectedItems.indexOf(rowData.ids) !== -1}
      style={
        selectedItems.indexOf(rowData.ids) !== -1
          ? { background: 'rgba(255,0,0,0.1)' }
          : {}
      }
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(rowData.ids) !== -1 ? true : false}
          onChange={() => handleSelectOne(rowData.ids)}
          value="true"
        />
      </TableCell>
      <CustomTableCell
        formValue={formValue}
        setFormValue={setFormValue}
        setOriginalFormVal={setOriginalFormVal}
        rowData={rowData}
        isEditMode={editing}
        onInputChange={onInputChange}
        modulesList={modulesList}
      />
      <TableCell align="right">
        {disableHover ? (
          editId === rowData.ids ? (
            <ButtonGroup>
              <CloseIcon onClick={() => onEditCancel(rowData.ids)} />
              <SaveIcon onClick={() => saveEditing(rowData.ids)} />
            </ButtonGroup>
          ) : (
            ''
          )
        ) : isHover ? (
          selectedItems.indexOf(rowData.ids) === -1 ? (
            <ButtonGroup>
              <EditIcon onClick={() => onEdit(rowData.ids)} />
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => deleteThis(rowData.ids)}
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
