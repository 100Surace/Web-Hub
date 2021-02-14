import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import * as actions from 'src/redux/actions/organization/module';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ModuleListView = ({
  fetch,
  modules,
  deleteModules,
  update,
  onInputChange,
  onSearch
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItem] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const selectItem = (id) => {
    const newIds = selectedItems.slice();
    if (newIds.indexOf(id) !== -1) {
      newIds.splice(newIds.indexOf(id), 1);
    } else {
      newIds.push(id);
    }
    setSelectedItem(newIds);
  };

  const selectAllItems = (items) => {
    setSelectedItem(items);
  };

  const { addToast } = useToasts();

  useEffect(() => {
    fetch();
  });

  const onEdit = () => {
    modules.filter(({ ids, moduleName }) => {
      return selectedItems[0] === ids ? onInputChange(moduleName) : '';
    });
  };

  const onDelete = () => {
    const onSuccess = () => {
      addToast('Delete successfully', { appearance: 'success' });
    };
    for (let i = 0; i < selectedItems.length; i++) {
      deleteModules(selectedItems[i], onSuccess);
    }

    setSelectedItem([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Page className={classes.root} title="Modules">
      <Container maxWidth={false}>
        <Toolbar
          currentId={selectedItems[0]}
          setSelectedItem={setSelectedItem}
        />
        <Box mt={3}>
          <Results
            selectItem={selectItem}
            selectedItems={selectedItems}
            modules={modules}
            onEdit={onEdit}
            onDelete={onDelete}
            selectAllItems={selectAllItems}
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            update={update}
          />
        </Box>
      </Container>
    </Page>
  );
};

ModuleListView.propTypes = {
  fetch: PropTypes.func,
  modules: PropTypes.array,
  onInputChange: PropTypes.func,
  deleteModules: PropTypes.func
};

const mapStateToProps = (state) => ({
  modules: state.modules.list
});

const mapActionToProps = {
  fetch: actions.fetchAll,
  deleteModules: actions.Delete,
  update: actions.update,
  onSearch: actions.onSearch,
  onInputChange: actions.onInputChange
};

export default connect(mapStateToProps, mapActionToProps)(ModuleListView);
