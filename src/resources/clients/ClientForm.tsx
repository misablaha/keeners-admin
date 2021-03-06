import React, { FC, Fragment } from 'react';
import { FormWithRedirect, NumberInput, required, TextInput } from 'react-admin';
import { useForm } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/icons/Accessible';
import Toolbar from '../../form/Toolbar';
import { phone } from '../../form/validate';
import LocationAutocompleteInput, { LocationAutocompleteResult } from '../../form/LocationAutocompleteInput';
import LocationMapInput from '../../form/LocationMapInput';
import ClientRequirementList from '../requirements/ClientRequirementList';
import { Client } from '../../types/records';
import IconBar from '../../components/IconBar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 0,
    marginTop: 0,
  },
  item: {
    paddingBottom: '0!important',
    paddingTop: '0!important',
  },
}));

const ClientFormLayout: FC<{ record: Partial<Client> }> = ({ record, children }) => {
  return record.id ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={7}>
        {children}
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <ClientRequirementList record={record} />
      </Grid>
    </Grid>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const ClientFormBody: FC<{ record: Partial<Client> }> = (props) => {
  const classes = useStyles();
  const form = useForm();

  const handleAgeChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const year = ev.target.value ? new Date().getFullYear() - parseInt(ev.target.value, 10) : null;
      form.change('yearOfBirth', year);
    },
    [form],
  );

  const handleYearOfBirthChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const age = ev.target.value ? new Date().getFullYear() - parseInt(ev.target.value, 10) : null;
      form.change('age', age);
    },
    [form],
  );

  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: LocationAutocompleteResult | null) => {
      form.change('address', result ? result.formatted_address : null);
      form.change('region', result ? result.region : null);
      form.change('location', result ? result.geometry.location.toJSON() : null);
    },
    [form],
  );

  return (
    <ClientFormLayout record={props.record}>
      <Card>
        <IconBar Icon={Icon} bgColor="#ff9800" />
        <Divider variant={'inset'} />
        <Toolbar {...props} />
        <CardContent>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="clients" source="firstName" fullWidth autoFocus />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="clients" source="lastName" fullWidth />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <NumberInput resource="clients" source="age" fullWidth onChange={handleAgeChange} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <NumberInput resource="clients" source="yearOfBirth" fullWidth onChange={handleYearOfBirthChange} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="clients" source="phoneNumber" fullWidth validate={[required(), phone()]} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="clients" source="email" fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="clients" source="disease" multiline fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="clients" source="note" multiline fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationAutocompleteInput resource="clients" source="address" fullWidth onChange={handleAddressChange} />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="clients" source="region" disabled fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationMapInput source="location" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ClientFormLayout>
  );
};

const ClientForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={ClientFormBody} />;

export default ClientForm;
