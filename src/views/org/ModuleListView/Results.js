import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
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
  TableSortLabel
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TableToolbar from '../TableToolbar';
import { Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';
import ConfirmDelete from 'src/views/modals/ConfirmDelete/index';

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

// get props passed from parent
const Results = ({
  className,
  modulesList,
  deleteModule,
  updateModule,
  setConfirmDeleteModal,
  confirmDeleteModal,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [oldList, setOldList] = useState([]);
  // module data state
  const [searchList, setSearchList] = useState([...modulesList]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');
  const [disableHover, setDisableHover] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState([]);
  const [deleteId, setDeletId] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedModuleIds;
    if (event.target.checked) {
      newSelectedModuleIds = searchList
        .slice(page * limit, page * limit + limit)
        .map((module) => module.ids);

      setSelectedItems((selectedItems) => [
        ...selectedItems,
        ...newSelectedModuleIds
      ]);
      setSelectedPerPage(newSelectedModuleIds);
      checkAll(newSelectedModuleIds);
    } else {
      newSelectedModuleIds = searchList
        .slice(page * limit, page * limit + limit)
        .map((module) => module.ids);
      const newItems = selectedItems.filter(
        (id) => !newSelectedModuleIds.includes(id)
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    checkAll(selectedItems);
  };

  const headCells = [
    {
      id: 1,
      label: 'Module',
      disablePadding: null
    }
  ];

  const onSearching = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    const result = modulesList.filter((module) =>
      module.moduleName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchList(result);
  };

  const handleRequestSort = () => {
    let result = [];
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    if (sortOrder === 'desc') {
      result = searchList.sort((a, b) =>
        a.moduleName.toLowerCase() > b.moduleName.toLowerCase()
          ? 1
          : b.moduleName.toLowerCase() > a.moduleName.toLowerCase()
          ? -1
          : 0
      );
    } else {
      result = searchList.sort((a, b) =>
        a.moduleName.toLowerCase() < b.moduleName.toLowerCase()
          ? 1
          : b.moduleName.toLowerCase() < a.moduleName.toLowerCase()
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
      deleteModule(deleteId, onSuccess);
      setDeletId(0);
    } else deleteModule(selectedItems, onSuccess);

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
    for (let i = 0; i < currentList.length; i++) {
      if (selectedItems.includes(currentList[i])) setIsCheckAll(true);
      else setIsCheckAll(false);
    }
    if (
      JSON.stringify(modulesList) !== JSON.stringify(oldList) &&
      searchInput == '' &&
      !isSorting
    ) {
      setOldList(modulesList);
      setSearchList(modulesList);
      // set page to 0 and set new limit when row per page is all
      if (limit === searchList.length) {
        setLimit(modulesList.length);
        setPage(0);
      }
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
          title="Modules"
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
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      style={{ cursor: 'pointer' }}
                      onClick={handleRequestSort}
                    >
                      <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchList.length !== 0 ? (
                  searchList
                    .slice(page * limit, page * limit + limit)
                    .map((module) => (
                      // passing essential props to DatatRow component
                      <DataRow
                        key={module.ids}
                        module={module}
                        selectedItems={selectedItems}
                        handleSelectOne={handleSelectOne}
                        updateModule={updateModule}
                        disableHover={disableHover}
                        setDisableHover={setDisableHover}
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

const mapStateToProps = (state) => ({});

const mapActionToProps = {
  deleteModule: actions.Delete,
  updateModule: actions.update
};

export default connect(mapStateToProps, mapActionToProps)(Results);

//
const DataRow = ({
  updateModule,
  module,
  selectedItems,
  handleSelectOne,
  disableHover,
  setDisableHover,
  setConfirmDeleteModal,
  setDeletId
}) => {
  const [input, setInput] = useState(module.moduleName);
  const [editing, setEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [editId, setEditId] = useState(0);

  const onEdit = (id) => {
    setInput(module.moduleName);
    setEditing(!editing);
    setDisableHover(true);
    setEditId(id);
  };

  const onEditCancel = () => {
    setInput(module.moduleName);
    setEditing(!editing);
    setDisableHover(false);
    setEditId(0);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const saveEditing = (id) => {
    updateModule(id, { moduleName: input });
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
    setDeletId(id);
    setConfirmDeleteModal(true);
  };
  return (
    <TableRow
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      hover
      key={module.ids}
      selected={selectedItems.indexOf(module.ids) !== -1}
      style={
        selectedItems.indexOf(module.ids) !== -1
          ? { background: 'rgba(255,0,0,0.1)' }
          : {}
      }
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(module.ids) !== -1 ? true : false}
          onChange={() => handleSelectOne(module.ids)}
          value="true"
        />
      </TableCell>
      <TableCell>
        <CustomTableCell
          isEditMode={editing}
          inputValue={input}
          onInputChange={onInputChange}
        />
      </TableCell>
      <TableCell align="right">
        {disableHover ? (
          editId === module.ids ? (
            <ButtonGroup>
              <CloseIcon onClick={() => onEditCancel(module.ids)} />
              <SaveIcon onClick={() => saveEditing(module.ids)} />
            </ButtonGroup>
          ) : (
            ''
          )
        ) : isHover ? (
          selectedItems.indexOf(module.ids) === -1 ? (
            <ButtonGroup>
              <EditIcon onClick={() => onEdit(module.ids)} />
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => deleteThis(module.ids)}
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
  module: PropTypes.object
};

const CustomTableCell = ({ isEditMode, inputValue, onInputChange }) => {
  const classes = useStyles();
  return (
    <>
      {isEditMode ? (
        <section align="left" className={classes.tableCell}>
          <Input
            value={inputValue}
            name="moduleName"
            onChange={(e) => onInputChange(e)}
            className={classes.input}
          />
        </section>
      ) : (
        <Typography>{inputValue}</Typography>
      )}
    </>
  );
};
