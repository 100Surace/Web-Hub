import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useToasts } from 'react-toast-notifications';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';

const useStyles = makeStyles((theme) => ({
  root: {},
  addItem: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0)
  }
}));

const Toolbar = ({
  className,
  form,
  onInputChange,
  currentId,
  create,
  update,
  setSelectedItem,
  ...rest
}) => {
  const classes = useStyles();

  const { addToast } = useToasts();

  const onChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      addToast('Submitted successfully', { appearance: 'success' });
    };

    if (form.moduleName !== '') {
      if (currentId === 0 || currentId === undefined) create(form, onSuccess);
      else update(currentId, form, onSuccess);

      onInputChange('');
      setSelectedItem([]);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={0}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="flex-end">
              <TextField
                fullWidth
                className={classes.addItem}
                label="Add Module"
                variant="outlined"
                name="moduleName"
                value={form.moduleName}
                onChange={onChange}
                required
              />
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  moduleName: PropTypes.string,
  moduleList: PropTypes.array,
  onInputChange: PropTypes.func,
  form: PropTypes.object,
  create: PropTypes.func,
  update: PropTypes.func,
  currentId: PropTypes.any,
  setSelectedItem: PropTypes.func
};

const mapStateToProps = (state) => ({
  moduleList: state.modules.list,
  form: state.modules.form
});

const mapActionToProps = {
  create: actions.create,
  update: actions.update,
  onInputChange: actions.onInputChange
};

export default connect(mapStateToProps, mapActionToProps)(Toolbar);
