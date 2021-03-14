import clsx from 'clsx';
import {
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import GetAppIcon from '@material-ui/icons/GetApp';

// custom hook for style
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: 'red',
          backgroundColor: 'rgba(255,0,0,0.1)'
        }
      : {
          color: 'red',
          backgroundColor: 'rgba(255,0,0,0.1)'
        },
  title: {
    flex: '1 1 100%'
  }
}));

const TableToolbar = ({
  title,
  numSelected,
  deleteSelected,
  clearSelection
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <section className="table-toolbar">
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
            className=""
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
            {title}
          </Typography>
        )}

        {numSelected > 0 ? (
          <div>
            <Tooltip title="Clear Selection">
              <IconButton onClick={clearSelection}> Clear</IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={deleteSelected} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </section>
    </Toolbar>
  );
};
export default TableToolbar;
