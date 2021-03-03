import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Input
} from '@material-ui/core';
import TableToolbar from '../TableToolbar';
import { Search as SearchIcon } from 'react-feather';
import DataRow from '../DataRow';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  moduleCategoryList,
  fetchModuleCategory,
  deleteModuleCategory,
  updateModuleCategory,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [searchList, setSearchList] = useState([...moduleCategoryList]);
  const [disableHover, setDisableHover] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState([]);
  const [oldList, setOldList] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;
    if (event.target.checked) {
      newSelectedCategoryIds = searchList
        .slice(page * limit, page * limit + limit)
        .map((category) => category.ids);
      setSelectedItems((selectedItems) => [
        ...selectedItems,
        ...newSelectedCategoryIds
      ]);
      setSelectedPerPage(newSelectedCategoryIds);
      checkAll(newSelectedCategoryIds);
    } else {
      newSelectedCategoryIds = searchList
        .slice(page * limit, page * limit + limit)
        .map((module) => module.ids);
      const newItems = selectedItems.filter(
        (id) => !newSelectedCategoryIds.includes(id)
      );
      setSelectedItems(newItems);
      setSelectedPerPage([]);
      setIsCheckAll(false);
    }
  };

  let currentList = [];
  const checkAll = (selected) => {
    currentList = searchList
      .slice(page * limit, page * limit + limit)
      .map((module) => module.ids);
    for (let i = 0; i < currentList.length; i++) {
      if (selected.includes(currentList[i])) setIsCheckAll(true);
    }
  };

  const handleSelectOne = (id) => {
    const newIds = selectedItems.slice();
    const curIds = selectedPerPage.slice();
    if (newIds.indexOf(id) !== -1) {
      newIds.splice(newIds.indexOf(id), 1);
    } else {
      newIds.push(id);
    }
    if (curIds.indexOf(id) !== -1) {
      curIds.splice(curIds.indexOf(id), 1);
      setIsCheckAll(false);
    } else {
      curIds.push(id);
      if (curIds.length === currentList.length) setIsCheckAll(true);
    }
    setSelectedItems(newIds);
    setSelectedPerPage(curIds);
  };

  const onSearching = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    const result = moduleCategoryList.filter((category) =>
      category.moduleName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchList(result);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const deleteSelected = () => {
    const onSuccess = () => {
      addToast('Delete successfully', { appearance: 'success' });
    };
    deleteModuleCategory(selectedItems, onSuccess);
    setSelectedItems([]);
    setSearchInput('');
    setIsSorting(false);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  useEffect(() => {
    for (let i = 0; i < currentList.length; i++) {
      if (selectedItems.includes(currentList[i])) setIsCheckAll(true);
      else setIsCheckAll(false);
    }
    if (
      JSON.stringify(moduleCategoryList) !== JSON.stringify(oldList) &&
      searchInput == '' &&
      !isSorting
    ) {
      setOldList(moduleCategoryList);
      setSearchList(moduleCategoryList);
    }
  });
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <TableToolbar
        title="Module Categories"
        numSelected={selectedItems.length}
        deleteSelected={deleteSelected}
        clearSelection={clearSelection}
      />
      <Box maxWidth={500}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search module"
          variant="outlined"
          value={searchInput}
          onChange={onSearching}
        />
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button>Import</Button>
          <Button>Export</Button>
        </ButtonGroup>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isCheckAll}
                    color="primary"
                    indeterminate={
                      selectedPerPage.length > 0 &&
                      selectedPerPage.length < currentList.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Module Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moduleCategoryList.slice(0, limit).map((moduleCategory) => (
                <DataRow
                  key={moduleCategory.ids}
                  rowData={moduleCategory}
                  selectedItems={selectedItems}
                  handleSelectOne={handleSelectOne}
                  updateData={updateModuleCategory}
                  deleteData={deleteModuleCategory}
                  setSelectedItems={setSelectedItems}
                  setSearchInput={setSearchInput}
                  setIsSorting={setIsSorting}
                  disableHover={disableHover}
                  setDisableHover={setDisableHover}
                  CustomTableCell={CustomTableCell}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={moduleCategoryList.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  moduleCategoryList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  // moduleCategoryList: state.moduleCategory.moduleCategoryList
});

// mapping redux actions to component props
const mapActionToProps = {
  fetchModuleCategory: actions.FetchAll,
  deleteModuleCategory: actions.Delete,
  updateModuleCategory: actions.Update
};

export default connect(mapStateToProps, mapActionToProps)(Results);

const CustomTableCell = ({ dataRow, isEditMode, onInputChange }) => {
  const classes = useStyles();
  return (
    <>
      {isEditMode ? (
        <>
          <TableCell>
            <section align="left" className={classes.tableCell}>
              <Input
                value={dataRow.moduleCategoryName}
                name="moduleCategoryName"
                onChange={(e) => onInputChange(e)}
                className={classes.input}
              />
            </section>
          </TableCell>
          <TableCell>
            <section align="left" className={classes.tableCell}>
              <Input
                value={dataRow.moduleName}
                name="moduleName"
                onChange={(e) => onInputChange(e)}
                className={classes.input}
              />
            </section>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <Typography>{dataRow.moduleCategoryName}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{dataRow.moduleName}</Typography>
          </TableCell>
        </>
      )}
    </>
  );
};
