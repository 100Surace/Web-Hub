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
  TableSortLabel,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Input,
  Select,
  MenuItem
} from '@material-ui/core';
import TableToolbar from '../TableToolbar';
import { Search as SearchIcon } from 'react-feather';
import DataRow from '../DataRow';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { toast } from 'react-toastify';
import ConfirmDelete from 'src/views/modals/ConfirmDelete/index';

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
  modulesList,
  setConfirmDeleteModal,
  confirmDeleteModal,
  ...rest
}) => {
  const classes = useStyles();
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
  const [deleteId, setDeletId] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;
    if (event.target.checked) {
      // gets ids that are not checked
      newSelectedCategoryIds = searchList
        .slice(page * limit, page * limit + limit)
        .map((category) => {
          if (!selectedItems.includes(category.ids)) return category.ids;
        })
        .filter((id) => id !== undefined);

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
      category.moduleCategoryName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchList(result);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    checkAll(selectedItems);
  };

  const handleRequestSort = (column) => {
    let result = [];
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    if (sortOrder === 'desc') {
      result = searchList.sort((a, b) =>
        a[column].toLowerCase() > b[column].toLowerCase()
          ? 1
          : b[column].toLowerCase() > a[column].toLowerCase()
          ? -1
          : 0
      );
    } else {
      result = searchList.sort((a, b) =>
        a[column].toLowerCase() < b[column].toLowerCase()
          ? 1
          : b[column].toLowerCase() < a[column].toLowerCase()
          ? -1
          : 0
      );
    }
    setSearchList(result);
    setIsSorting(true);
  };

  const deleteSelected = () => {
    setConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    const onSuccess = () => {
      toast.success('Deleted successfully');
    };
    if (deleteId) {
      deleteModuleCategory(deleteId, onSuccess);
      setDeletId(0);
    } else deleteModuleCategory(selectedItems, onSuccess);

    setSelectedItems([]);
    setSearchInput('');
    setIsSorting(false);
    setSelectedPerPage([]);
    setConfirmDeleteModal(false);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  currentList = searchList
    .slice(page * limit, page * limit + limit)
    .map((module) => module.ids);
  useEffect(() => {
    const dataCount = Object.keys(moduleCategoryList).length;
    for (let i = 0; i < currentList.length; i++) {
      if (selectedItems.includes(currentList[i])) setIsCheckAll(true);
      else setIsCheckAll(false);
    }
    if (
      searchInput == '' &&
      !isSorting &&
      JSON.stringify(moduleCategoryList) !== JSON.stringify(oldList)
    ) {
      setOldList(moduleCategoryList);
      setSearchList(moduleCategoryList);
    }

    if (dataCount <= limit) {
      setPage(0);
    }
  });
  return (
    <>
      {confirmDeleteModal ? (
        <ConfirmDelete
          setConfirmDeleteModal={setConfirmDeleteModal}
          confirmDelete={confirmDelete}
        />
      ) : (
        ''
      )}
      <Card className={clsx(classes.root, className)} {...rest}>
        <TableToolbar
          title="Module Categories"
          numSelected={selectedItems.length}
          deleteSelected={deleteSelected}
          clearSelection={clearSelection}
        />
        <Box maxWidth={500}>
          <TextField
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
                  <TableCell
                    onClick={() => handleRequestSort('moduleCategoryName')}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableSortLabel>Category Name</TableSortLabel>
                  </TableCell>
                  <TableCell
                    onClick={() => handleRequestSort('moduleName')}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableSortLabel>Module Name</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchList.length !== 0 ? (
                  searchList
                    .slice(page * limit, page * limit + limit)
                    .map((moduleCategory) => (
                      <DataRow
                        key={moduleCategory.ids}
                        rowData={moduleCategory}
                        selectedItems={selectedItems}
                        handleSelectOne={handleSelectOne}
                        updateData={updateModuleCategory}
                        disableHover={disableHover}
                        setDisableHover={setDisableHover}
                        CustomTableCell={CustomTableCell}
                        modulesList={modulesList}
                        setConfirmDeleteModal={setConfirmDeleteModal}
                        setDeletId={setDeletId}
                      />
                    ))
                ) : (
                  <TableRow
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#777'
                    }}
                  >
                    <TableSortLabel>No Matching Result</TableSortLabel>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={searchList.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
        />
      </Card>
    </>
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

//
const CustomTableCell = ({
  formValue,
  setFormValue,
  setOriginalFormVal,
  rowData,
  isEditMode,
  onInputChange,
  modulesList
}) => {
  const classes = useStyles();
  useEffect(() => {
    // console.log(rowData);
    const data = {
      moduleCategoryName: rowData.moduleCategoryName,
      moduleId: rowData.moduleId,
      moduleName: rowData.moduleName
    };
    // sets formValue if it is empty
    setFormValue({ ...data });

    // save original data
    setOriginalFormVal({ ...data });
  }, [Object.values(rowData)]);
  return (
    <>
      {isEditMode ? (
        <>
          <TableCell>
            <section align="left" className={classes.tableCell}>
              <Input
                value={formValue.moduleCategoryName}
                name="moduleCategoryName"
                onChange={(e) => onInputChange(e)}
                className={classes.input}
              />
            </section>
          </TableCell>
          <TableCell>
            <section align="left" className={classes.tableCell}>
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
              {formValue.hasOwnProperty('moduleCategoryName')
                ? formValue.moduleCategoryName
                : rowData.moduleCategoryName}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {formValue.hasOwnProperty('moduleName')
                ? formValue.moduleName
                : rowData.moduleName}
            </Typography>
          </TableCell>
        </>
      )}
    </>
  );
};
