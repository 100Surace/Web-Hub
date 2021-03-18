import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  Typography,
  Input,
  Select,
  MenuItem
} from '@material-ui/core';

const CustomTableCell = ({
  formValue,
  setFormValue,
  setOriginalFormVal,
  rowData,
  isEditMode,
  onInputChange,
  modulesList
}) => {
  // re-render if rowData is changed
  useEffect(() => {
    const data = {
      moduleCategoryName: rowData.moduleCategoryName,
      moduleId: rowData.moduleId,
      moduleName: rowData.moduleName
    };
    // sets formValue if it is empty
    setFormValue({ ...data });

    // save original data
    setOriginalFormVal({ ...data });
  }, [rowData.moduleCategoryList, rowData.moduleName, rowData.moduleId]);
  return (
    <>
      {isEditMode ? (
        <>
          <TableCell>
            <section align="left">
              <Input
                value={formValue.moduleCategoryName}
                name="moduleCategoryName"
                onChange={(e) => onInputChange(e)}
              />
            </section>
          </TableCell>
          <TableCell>
            <section align="left">
              <Select
                labelId="SelectModule"
                id="SelectModule"
                value={formValue.moduleId}
                onChange={(e) => onInputChange(e)}
                label="Select Module"
                name="moduleId"
              >
                {modulesList.map(({ ids, moduleName }) => (
                  <MenuItem key={ids} value={ids}>
                    {moduleName}
                  </MenuItem>
                ))}
              </Select>
            </section>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <Typography>
              {formValue.moduleCategoryName
                ? formValue.moduleCategoryName
                : rowData.moduleCategoryName}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {formValue.moduleName ? formValue.moduleName : rowData.moduleName}
            </Typography>
          </TableCell>
        </>
      )}
    </>
  );
};

CustomTableCell.propTypes = {
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  setOriginalFormVal: PropTypes.func,
  rowData: PropTypes.object,
  isEditMode: PropTypes.bool,
  onInputChange: PropTypes.func,
  modulesList: PropTypes.object
};

export default CustomTableCell;
