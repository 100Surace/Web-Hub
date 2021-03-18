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
  Button,
  TableSortLabel,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { toast } from 'react-toastify';
import ConfirmDelete from 'src/views/modals/ConfirmDelete/index';
import * as dataTable from 'src/redux/actions/dataTable';
import { sortDesc, sortAsc } from 'src/utils/dataTableHelper';
import DataRow from '../DataRow';
import TableToolbar from '../TableToolbar';
import CustomTableCell from './CustomTableCell';

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
  limit,
  setLimit,
  page,
  setPage,
  isSorting,
  setIsSorting,
  sortOrder,
  setSortOrder,
  searchInput,
  setSearchInput,
  isCheckAll,
  setIsCheckAll,
  selectedPerPage,
  setSelectedPerPage,
  deleteId,
  setDeleteId,
  selectedItems,
  setSelectedItems,
  disableHover,
  setDisableHover,
  ...rest
}) => {
  const classes = useStyles();
  const [searchList, setSearchList] = useState([...moduleCategoryList]);
  const [oldList, setOldList] = useState([]);

  let currentList = [];
  const checkAll = (selected) => {
    currentList = searchList
      .slice(page * limit, page * limit + limit)
      .map((module) => module.ids);
    for (let i = 0; i < currentList.length; i++) {
      if (selected.includes(currentList[i])) setIsCheckAll(true);
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;
    if (event.target.checked) {
      // gets ids that are not checked
      newSelectedCategoryIds = searchList
        .slice(page * limit, page * limit + limit)
        .filter((category) => !selectedItems.includes(category.ids))
        .map((category) => category.ids);

      setSelectedItems([...selectedItems, ...newSelectedCategoryIds]);
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

  const onSearching = ({ target: { value } }) => {
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
      result = searchList.sort((a, b) => sortDesc(column, a, b));
    } else {
      result = searchList.sort((a, b) => sortAsc(column, a, b));
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
      setDeleteId(0);
    } else deleteModuleCategory(selectedItems, onSuccess);

    setSelectedItems([]);
    setSearchInput('');
    setIsSorting(false);
    setSelectedPerPage([]);
    setConfirmDeleteModal(false);
  };

  const clearSelection = () => {
    setSelectedItems([]);
    setIsCheckAll(false);
  };

  currentList = searchList
    .slice(page * limit, page * limit + limit)
    .map((module) => module.ids);

  useEffect(() => {
    for (let i = 0; i < currentList.length; i++) {
      if (selectedItems.includes(currentList[i])) setIsCheckAll(true);
      else setIsCheckAll(false);
    }
    if (!isSorting && searchInput === '') setSearchList(moduleCategoryList);
    // set page to 0 and set new limit when row per page is all
    if (limit === searchList.length) {
      setLimit(moduleCategoryList.length);
      setPage(0);
    }
    if (JSON.stringify(moduleCategoryList) !== JSON.stringify(oldList)) {
      setOldList(moduleCategoryList);
      setSearchList(moduleCategoryList);
    }
  }, [moduleCategoryList, searchList, page, limit]);

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
                    className="column-title"
                  >
                    <TableSortLabel>Category Name</TableSortLabel>
                  </TableCell>
                  <TableCell
                    onClick={() => handleRequestSort('moduleName')}
                    className="column-title"
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
                        setDeleteId={setDeleteId}
                      />
                    ))
                ) : (
                  <TableRow>
                    <TableSortLabel className="no-match-text">
                      No Matching Result
                    </TableSortLabel>
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
          rowsPerPageOptions={[
            10,
            25,
            50,
            100,
            { label: 'All', value: searchList.length }
          ]}
        />
      </Card>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  moduleCategoryList: PropTypes.array,
  fetchModuleCategory: PropTypes.func,
  deleteModuleCategory: PropTypes.func,
  updateModuleCategory: PropTypes.func,
  modulesList: PropTypes.array,
  setConfirmDeleteModal: PropTypes.func,
  confirmDeleteModal: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  isSorting: PropTypes.bool,
  setIsSorting: PropTypes.func,
  sortOrder: PropTypes.string,
  setSortOrder: PropTypes.func,
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
  isCheckAll: PropTypes.bool,
  setIsCheckAll: PropTypes.func,
  selectedPerPage: PropTypes.array,
  setSelectedPerPage: PropTypes.func,
  deleteId: PropTypes.number,
  setDeleteId: PropTypes.func,
  selectedItems: PropTypes.array,
  setSelectedItems: PropTypes.func,
  disableHover: PropTypes.bool,
  setDisableHover: PropTypes.func
};

const mapStateToProps = (state) => ({
  limit: state.dataTable.limit,
  page: state.dataTable.page,
  isSorting: state.dataTable.isSorting,
  sortOrder: state.dataTable.sortOrder,
  searchInput: state.dataTable.searchInput,
  isCheckAll: state.dataTable.isCheckAll,
  selectedPerPage: state.dataTable.selectedPerPage,
  deleteId: state.dataTable.deleteId,
  selectedItems: state.dataTable.selectedItems,
  disableHover: state.dataTable.disableHover
});

// mapping redux actions to component props
const mapActionToProps = {
  fetchModuleCategory: actions.FetchAll,
  deleteModuleCategory: actions.Delete,
  updateModuleCategory: actions.Update,
  setLimit: dataTable.setLimit,
  setPage: dataTable.setPage,
  setIsSorting: dataTable.setIsSorting,
  setSortOrder: dataTable.setSortOrder,
  setSearchInput: dataTable.setSearchInput,
  setIsCheckAll: dataTable.setIsCheckAll,
  setSelectedPerPage: dataTable.setSelectedPerPage,
  setDeleteId: dataTable.setDeleteId,
  setSelectedItems: dataTable.setSelectedItems,
  setDisableHover: dataTable.setDisableHover
};

export default connect(mapStateToProps, mapActionToProps)(Results);
