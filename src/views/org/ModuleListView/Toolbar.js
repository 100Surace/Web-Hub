import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';

const useStyles = makeStyles(() => ({
  root: {},
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
      create(form, onSuccess);
      onInputChange('');
    }
  };
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                value={form.moduleName}
                onChange={onChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        onClick={handleSubmit}
                      >
                        Add
                      </Button>
                    </InputAdornment>
                  )
                }}
                placeholder="Add module"
                variant="outlined"
              />
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
  modules: PropTypes.array,
  onInputChange: PropTypes.func,
  form: PropTypes.object,
  create: PropTypes.func
};

const mapStateToProps = (state) => ({
  modules: state.modules.list,
  form: state.modules.form
});

const mapActionToProps = {
  create: actions.create,
  onInputChange: actions.onInputChange
};

export default connect(mapStateToProps, mapActionToProps)(Toolbar);
