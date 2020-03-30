import React, { FC } from 'react';
import {
  BooleanInput,
  CheckboxGroupInput,
  FormWithRedirect,
  ReferenceArrayInput,
  required,
  TextInput,
  Toolbar,
} from 'react-admin';
import { useForm } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { pickToolbarProps } from '../../form/utils';
import { phone } from '../../form/validate';
import LocationAutocompleteInput from '../../form/LocationAutocompleteInput';
import LocationMapInput from '../../form/LocationMapInput';

const useStyles = makeStyles(theme => ({
  item: {
    marginBottom: theme.spacing(-2),
  },
}));

const HelperFormBody: FC = props => {
  const classes = useStyles();
  const form = useForm();

  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: google.maps.GeocoderResult | null) => {
      form.change('location', result ? result.geometry.location : null);
    },
    [form],
  );

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6} className={classes.item}>
            <TextInput resource="helpers" source="firstName" fullWidth validate={required()} autoFocus />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.item}>
            <TextInput resource="helpers" source="lastName" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.item}>
            <TextInput resource="helpers" source="phoneNumber" fullWidth validate={[required(), phone()]} />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.item}>
            <TextInput resource="helpers" source="email" fullWidth />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <BooleanInput resource="helpers" source="isActive" defaultValue={true} />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <ReferenceArrayInput reference="services" resource="helpers" source="provideIds" fullWidth>
              <CheckboxGroupInput />
            </ReferenceArrayInput>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <LocationAutocompleteInput resource="helpers" source="address" fullWidth onChange={handleAddressChange} />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <LocationMapInput source="location" />
          </Grid>
        </Grid>
      </CardContent>
      <Toolbar {...pickToolbarProps(props)} />
    </Card>
  );
};

const HelperForm: FC = props => <FormWithRedirect {...props} redirect="list" render={HelperFormBody} />;

export default HelperForm;