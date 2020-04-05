import React, { FC, Fragment } from 'react';
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
import Icon from '@material-ui/icons/SupervisedUserCircle';
import { pickToolbarProps } from '../../form/utils';
import { phone } from '../../form/validate';
import LocationAutocompleteInput, { LocationAutocompleteResult } from '../../form/LocationAutocompleteInput';
import LocationMapInput from '../../form/LocationMapInput';
import { Helper } from '../../types/records';
import HelperRequirementList from '../requirements/HelperRequirementList';
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

const HelperFormLayout: FC<{ record: Partial<Helper> }> = ({ record, children }) => {
  return record.id ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={7}>
        {children}
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <HelperRequirementList record={record} />
      </Grid>
    </Grid>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const HelperFormBody: FC<{ record: Partial<Helper> }> = (props) => {
  const classes = useStyles();
  const form = useForm();

  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: LocationAutocompleteResult | null) => {
      form.change('address', result ? result.formatted_address : null);
      form.change('region', result ? result.region : null);
      form.change('location', result ? result.geometry.location.toJSON() : null);
    },
    [form],
  );

  return (
    <HelperFormLayout record={props.record}>
      <Card>
        <IconBar Icon={Icon} bgColor="#6c2744" />
        <CardContent>
          <Grid container spacing={2} className={classes.container}>
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
            <Grid item xs={12} lg={6} className={classes.item}>
              <TextInput resource="helpers" source="callSign" fullWidth />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <BooleanInput resource="helpers" source="isActive" defaultValue={true} />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <ReferenceArrayInput
                reference="services"
                resource="helpers"
                source="provideIds"
                filter={{ 'isInternal||$eq': false }}
                fullWidth
              >
                <CheckboxGroupInput />
              </ReferenceArrayInput>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="helpers" source="note" multiline fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationAutocompleteInput resource="helpers" source="address" fullWidth onChange={handleAddressChange} />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <TextInput resource="clients" source="region" disabled fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <LocationMapInput source="location" />
            </Grid>
          </Grid>
        </CardContent>
        <Toolbar {...pickToolbarProps(props)} />
      </Card>
    </HelperFormLayout>
  );
};

const HelperForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={HelperFormBody} />;

export default HelperForm;
