import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import { fetchAll } from 'src/redux/actions/organization/module';

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
  moduleCategoryList
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchModuleCategory();
    fetchModules();
  }, []);

  return (
    <Page className={classes.root} title="ModuleCategories">
      <Container maxWidth={false}>
        <Toolbar modulesList={modulesList} />
        <Box mt={3}>
          <Results
            moduleCategoryList={moduleCategoryList}
            modulesList={modulesList}
          />
        </Box>
      </Container>
    </Page>
  );
};

// mapping redux states to component props
const mapStateToProps = (state) => ({
  moduleCategoryList: state.moduleCategory.moduleCategoryList,
  modulesList: state.modules.modulesList
});

// mapping redux actions to component props
const mapActionToProps = {
  fetchModuleCategory: actions.FetchAll,
  fetchModules: fetchAll
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ModuleCategoryListView);
