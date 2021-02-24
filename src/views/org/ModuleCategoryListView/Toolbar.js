import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const Toolbar = ({ className, modulesList, ...rest }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    moduleId: '',
    moduleCategoryName: ''
  });

  const handleInputeChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
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
                  value=""
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
                      <Button color="primary" variant="contained" size="small">
                        Add
                      </Button>
                    </InputAdornment>
                  )
                }}
                placeholder="Module Category"
                variant="outlined"
                onChange={(e) => handleInputeChange(e)}
                name="moduleCategoryName"
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

export default Toolbar;
