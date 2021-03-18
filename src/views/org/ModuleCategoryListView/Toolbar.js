import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/moduleCategory';
import { toast } from 'react-toastify';

const Toolbar = ({ className, modulesList, addModuleCategory, ...rest }) => {
  const [formState, setFormState] = useState({
    moduleId: '',
    moduleCategoryName: '',
    moduleName: ''
  });
  const [error, setError] = useState({
    module: '',
    moduleCategory: ''
  });

  const handleInputeChange = ({ target: { name, value } }) => {
    if (name === 'moduleId') {
      // gets moduleName of selected id
      const module = modulesList.filter((m) => m.ids === value)[0];

      setFormState({
        ...formState,
        moduleId: value,
        moduleName: module.moduleName
      });
    } else if (name === 'moduleCategoryName') {
      setFormState({ ...formState, moduleCategoryName: value });
    }
  };
  const validateInput = ({ target: { name } }) => {
    if (name === 'moduleCategoryName') {
      if (formState.moduleCategoryName.length < 2) {
        setError({
          ...error,
          moduleCategory: 'Minimum 2 characters are required'
        });
      } else {
        setError({ ...error, moduleCategory: '' });
      }
    } else if (!formState.moduleId) {
      setError({ ...error, module: 'Module is required' });
    } else {
      setError({ ...error, module: '' });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (error.module === '' && error.moduleCategory === '') {
      const onSuccess = () => {
        toast.success('Added successfully');
      };
      if (formState.moduleId !== '' && formState.moduleCategoryName !== '') {
        addModuleCategory(formState, onSuccess);
      }
      setFormState({ ...formState, moduleId: '', moduleCategoryName: '' });
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={clsx(className)} {...rest}>
      <Box mt={1}>
        <Card>
          <CardContent>
            <Box maxWidth={800} display="flex">
              <div className="formgroup">
                <FormControl variant="outlined" fullWidth required>
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
                      <MenuItem key={ids} value={ids} onBlur={validateInput}>
                        {moduleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error.module !== '' ? (
                  <span className="form-error">{error.module}</span>
                ) : (
                  ''
                )}
              </div>
              <div className="formgroup">
                <TextField
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
                  onBlur={validateInput}
                />
                {error.moduleCategory !== '' ? (
                  <span className="form-error">{error.moduleCategory}</span>
                ) : (
                  ''
                )}
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  modulesList: PropTypes.object,
  addModuleCategory: PropTypes.func
};

const mapStateToProps = () => ({});

const mapActionToProps = {
  addModuleCategory: actions.Create
};

export default connect(mapStateToProps, mapActionToProps)(Toolbar);
