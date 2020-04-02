import React, { FC, Fragment } from 'react';
import { FormWithRedirect, NumberInput, required, TextInput, Toolbar } from 'react-admin';
import { useForm } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/icons/Accessible';
import { pickToolbarProps } from '../../form/utils';
import { phone } from '../../form/validate';
import LocationAutocompleteInput from '../../form/LocationAutocompleteInput';
import LocationMapInput from '../../form/LocationMapInput';
import RecipientRequirementList from '../requirements/RecipientRequirementList';
import { Recipient } from '../../types/records';
import IconBar from '../../components/IconBar';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 0,
    marginTop: 0,
  },
  item: {
    paddingBottom: '0!important',
    paddingTop: '0!important',
  },
}));

const RecipientFormLayout: FC<{ record: Partial<Recipient> }> = ({ record, children }) => {
  return record.id ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={7}>
        {children}
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <RecipientRequirementList record={record} />
      </Grid>
    </Grid>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const RecipientFormBody: FC<{record: Partial<Recipient>}> = props => {
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
    (event: React.ChangeEvent<HTMLInputElement>, result: google.maps.GeocoderResult | null) => {
      form.change('location', result ? result.geometry.location.toJSON() : null);
    },
    [form],
  );

  return (
    <RecipientFormLayout record={props.record}>
      <Card>
        <IconBar Icon={Icon} bgColor="#ff9800" />
        <CardContent>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="recipients" source="firstName" fullWidth autoFocus />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="recipients" source="lastName" fullWidth />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <NumberInput resource="recipients" source="age" fullWidth onChange={handleAgeChange} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <NumberInput resource="recipients" source="yearOfBirth" fullWidth onChange={handleYearOfBirthChange} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="recipients" source="phoneNumber" fullWidth validate={[required(), phone()]} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="recipients" source="email" fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="helpers" source="note" multiline fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationAutocompleteInput
                resource="recipients"
                source="address"
                fullWidth
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationMapInput source="location" />
            </Grid>
          </Grid>
        </CardContent>
        <Toolbar {...pickToolbarProps(props)} />
      </Card>
    </RecipientFormLayout>
  );
};

const RecipientForm: FC = props => <FormWithRedirect {...props} redirect="list" render={RecipientFormBody} />;

export default RecipientForm;
