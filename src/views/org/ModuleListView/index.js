import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';
import { resetState } from 'src/redux/actions/dataTable';
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

const ModuleListView = ({ fetchModules, modulesList, resetState }) => {
  const classes = useStyles();

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  useEffect(() => {
    fetchModules();
    resetState();
  }, []);

  // useEffect(() => {
  //   resetState();
  // }, []);
  return (
    <Page className={classes.root} title="Modules">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {/* passing props to Result child component */}
          <Results
            modulesList={modulesList}
            setConfirmDeleteModal={setConfirmDeleteModal}
            confirmDeleteModal={confirmDeleteModal}
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
  modulesList: state.modules.modulesList
});

const mapActionToProps = {
  fetchModules: actions.fetchAll,
  resetState: resetState
};

export default connect(mapStateToProps, mapActionToProps)(ModuleListView);
