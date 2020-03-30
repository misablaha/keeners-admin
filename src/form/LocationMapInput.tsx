import React, { FC } from 'react';
import { InputProps } from 'ra-core';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextFieldProps } from '@material-ui/core';
import { useFormState } from 'react-final-form';
import { AnyObject } from '../types/core';

const useStyles = makeStyles({
  map: {
    width: '100%',
    height: 500,
  },
});

const LocationMapInput: FC<InputProps<TextFieldProps>> = props => {
  const classes = useStyles();
  const { values } = useFormState<AnyObject>();

  return values[props.source] ? (
    <Paper variant={'outlined'}>
      <GoogleMap mapContainerClassName={classes.map} center={values[props.source]} zoom={14}>
        <Marker position={values[props.source]} />
      </GoogleMap>
    </Paper>
  ) : null;
};

export default LocationMapInput;
