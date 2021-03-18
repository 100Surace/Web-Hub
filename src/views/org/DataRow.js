import React, { useState } from 'react';
import { Checkbox, TableCell, TableRow, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

// Destructuring props from Parent
const DataRow = ({
  updateData,
  rowData,
  selectedItems,
  handleSelectOne,
  setDeleteId,
  setConfirmDeleteModal,
  disableHover,
  setDisableHover,
  CustomTableCell,
  modulesList
}) => {
  const [editing, setEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [editId, setEditId] = useState(0);
  const [formValue, setFormValue] = useState({});
  // storing initial/orginal row data in state
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
  // typing state
  const onInputChange = ({ target: { value, name } }) => {
    setFormValue({ ...formValue, [name]: value });
  };
  const saveEditing = (id) => {
    // gets slected moduleName from id
    const module = modulesList.filter((m) => m.ids === formValue.moduleId)[0];
    updateData(id, { ...formValue, moduleName: module.moduleName });
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
    // set state with updated moduleName
    setFormValue({ ...formValue, moduleName: module.moduleName });
  };

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };
  // Delete current data row
  const deleteThis = (id) => {
    setDeleteId(id);
    setConfirmDeleteModal(true);
  };

  const renderActionButtons = (row) => {
    let actionBtns;
    if (disableHover && editId === row.ids) {
      actionBtns = (
        <ButtonGroup>
          <CloseIcon
            className="btn-icon"
            onClick={() => onEditCancel(row.ids)}
          />
          <SaveIcon className="btn-icon" onClick={() => saveEditing(row.ids)} />
        </ButtonGroup>
      );
    } else if (isHover && selectedItems.indexOf(row.ids) === -1) {
      actionBtns = (
        <ButtonGroup>
          <EditIcon className="btn-icon" onClick={() => onEdit(row.ids)} />
          <DeleteIcon
            className="btn-icon"
            onClick={() => deleteThis(row.ids)}
          />
        </ButtonGroup>
      );
    }
    return actionBtns;
  };

  return (
    <TableRow
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      hover
      key={rowData.ids}
      selected={selectedItems.indexOf(rowData.ids) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(rowData.ids) !== -1}
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
      <TableCell align="right">{renderActionButtons(rowData)}</TableCell>
    </TableRow>
  );
};

DataRow.propTypes = {
  updateData: PropTypes.func,
  rowData: PropTypes.object,
  selectedItems: PropTypes.array,
  handleSelectOne: PropTypes.func,
  setDeleteId: PropTypes.func,
  setConfirmDeleteModal: PropTypes.func,
  disableHover: PropTypes.bool,
  setDisableHover: PropTypes.func,
  CustomTableCell: PropTypes.any,
  modulesList: PropTypes.array
};

export default DataRow;
