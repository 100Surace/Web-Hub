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
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';

const useStyles = makeStyles(() => ({
  root: {}
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

  const onChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success('Submitted successfully');
    };

    if (form.moduleName !== '') {
      create(form, onSuccess);
      onInputChange('');
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                value={form.moduleName}
                onChange={onChange}
                onKeyDown={handleEnter}
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
