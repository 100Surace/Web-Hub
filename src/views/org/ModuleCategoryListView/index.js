import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import { fetchAll } from 'src/redux/actions/organization/module';
import { resetState } from 'src/redux/actions/dataTable';
import Results from './Results';
import Toolbar from './Toolbar';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
// module Category list view component (parent component)
const ModuleCategoryListView = ({
  fetchModuleCategory,
  fetchModules,
  modulesList,
  moduleCategoryList,
  resetDataTableState
}) => {
  const classes = useStyles();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  useEffect(() => {
    fetchModuleCategory();
    fetchModules();
    resetDataTableState();
  }, []);

  return (
    <Page className={classes.root} title="ModuleCategories">
      <Container maxWidth={false}>
        <Toolbar modulesList={modulesList} />
        <Box mt={3}>
          <Results
            moduleCategoryList={moduleCategoryList}
            modulesList={modulesList}
            setConfirmDeleteModal={setConfirmDeleteModal}
            confirmDeleteModal={confirmDeleteModal}
          />
        </Box>
      </Container>
    </Page>
  );
};

ModuleCategoryListView.propTypes = {
  fetchModuleCategory: PropTypes.func,
  fetchModules: PropTypes.func,
  modulesList: PropTypes.object,
  moduleCategoryList: PropTypes.object,
  resetDataTableState: PropTypes.func
};

// mapping redux states to component props
const mapStateToProps = (state) => ({
  moduleCategoryList: state.moduleCategory.moduleCategoryList,
  modulesList: state.modules.modulesList
});

// mapping redux actions to component props
const mapActionToProps = {
  fetchModuleCategory: actions.FetchAll,
  fetchModules: fetchAll,
  resetDataTableState: resetState
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ModuleCategoryListView);
