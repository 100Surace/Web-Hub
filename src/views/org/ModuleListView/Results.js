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
  TableSortLabel,
  lighten,
  Toolbar,
  Tooltip,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { setIn } from 'formik';

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

const Results = ({
  className,
  modules,
  selectItem,
  currentId,
  onDelete,
  selectedItems,
  selectAllItems,
  onRequestSort,
  order,
  orderBy,
  update,
  ...rest
}) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(modules);

  const handleSelectAll = (event) => {
    let newSelectedModuleIds;

    if (event.target.checked) {
      newSelectedModuleIds = modules.map((module) => module.ids);
    } else {
      newSelectedModuleIds = [];
    }
    selectAllItems(newSelectedModuleIds);
  };

  const handleSelectOne = (id) => {
    selectItem(id);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const headCells = [
    {
      id: 1,
      label: 'Module',
      disablePadding: null
    }
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const search = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const result = modules.filter((module) =>
      module.moduleName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(result);
  };

  useEffect(() => {
    if (searchText == '') setSearchResult(modules);
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <TableToolbar
        numSelected={selectedItems.length}
        deleteSelected={onDelete}
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
          value={searchText}
          onChange={search}
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
                    checked={selectedItems.length === modules.length}
                    color="primary"
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < modules.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}></span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResult.length !== 0 ? (
                searchResult
                  .slice(0, limit)
                  .map((module) => (
                    <DataRow
                      key={module.ids}
                      module={module}
                      selectedItems={selectedItems}
                      handleSelectOne={handleSelectOne}
                      update={update}
                    />
                  ))
              ) : (
                <TableRow
                  style={{ width: '100%', textAlign: 'center', color: '#777' }}
                >
                  No Matching Result
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={modules.length}
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
  modules: PropTypes.array.isRequired,
  selectItem: PropTypes.func,
  currentId: PropTypes.array,
  onDelete: PropTypes.func,
  selectedItems: PropTypes.array,
  selectAllItems: PropTypes.func
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const TableToolbar = ({ numSelected, deleteSelected }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Modules
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={deleteSelected} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const DataRow = ({ update, module, selectedItems, handleSelectOne }) => {
  const [input, setInput] = useState(module.moduleName);
  const [editing, setEditing] = useState(false);

  const onEdit = () => {
    setInput(module.moduleName);
    setEditing(!editing);
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const saveEditing = (id) => {
    update(id, { moduleName: input });
    setEditing(!editing);
  };
  return (
    <TableRow
      hover
      key={module.ids}
      selected={selectedItems.indexOf(module.ids) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(module.ids) !== -1 ? true : ''}
          onChange={() => handleSelectOne(module.ids)}
          value="true"
        />
      </TableCell>
      <TableCell padding="checkbox">
        {editing ? (
          <ButtonGroup>
            <Button size="small">
              <CloseIcon onClick={onEdit} />
            </Button>
            <Button size="small">
              <SaveIcon onClick={() => saveEditing(module.ids)} />
            </Button>
          </ButtonGroup>
        ) : (
          <Button size="small">
            <EditIcon onClick={onEdit} />
          </Button>
        )}
      </TableCell>
      <TableCell>
        <CustomTableCell
          isEditMode={editing}
          value={input}
          onChange={onChange}
        />
      </TableCell>
    </TableRow>
  );
};
DataRow.propTypes = {
  module: PropTypes.object
};

const CustomTableCell = ({ isEditMode, value, onChange }) => {
  const classes = useStyles();
  return (
    <>
      {isEditMode ? (
        <section align="left" className={classes.tableCell}>
          <Input
            value={value}
            name="moduleName"
            onChange={(e) => onChange(e)}
            className={classes.input}
          />
        </section>
      ) : (
        <Typography>{value}</Typography>
      )}
    </>
  );
};

export default Results;
