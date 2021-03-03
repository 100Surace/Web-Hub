import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const Toolbar = ({ className, modulesList, addModuleCategory, ...rest }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    moduleId: '',
    moduleCategoryName: ''
  });
  const { addToast } = useToasts();

  const handleInputeChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'moduleId') setFormState({ ...formState, moduleId: value });
    else if (name === 'moduleCategoryName')
      setFormState({ ...formState, moduleCategoryName: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      addToast('Submitted successfully', { appearance: 'success' });
    };
    if (formState.moduleId != '' && formState.moduleCategoryName != '') {
      addModuleCategory(formState, onSuccess);
    }
    setFormState({ ...formState, moduleId: '', moduleCategoryName: '' });
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={1}>
        <Card>
          <CardContent>
            <Box maxWidth={800} display="flex">
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Module
                </InputLabel>
                <Select
                  labelId="SelectModule"
                  id="SelectModule"
                  value={formState.moduleId}
                  onChange={handleInputeChange}
                  label="Select Module"
                  name="moduleId"
                >
                  {modulesList.map(({ ids, moduleName }) => (
                    <MenuItem value={ids}>{moduleName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                      >
                        Add
                      </Button>
                    </InputAdornment>
                  )
                }}
                value={formState.moduleCategoryName}
                placeholder="Module Category"
                variant="outlined"
                onChange={(e) => handleInputeChange(e)}
                name="moduleCategoryName"
                onKeyDown={handleEnter}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => ({});

const mapActionToProps = {
  addModuleCategory: actions.Create
};

export default connect(mapStateToProps, mapActionToProps)(Toolbar);
