import React, { FC } from 'react';
import {
  CheckboxGroupInput,
  DateInput,
  FormWithRedirect,
  Link,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  TextInput,
  Toolbar,
} from 'react-admin';
import { useDataProvider, useTranslate } from 'ra-core';
import { useForm, useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import HelperIcon from '@material-ui/icons/SupervisedUserCircle';
import { formatPhoneNumber, pickToolbarProps } from '../../form/utils';
import LocationMapInput from '../../form/LocationMapInput';
import { Helper, Client, Requirement, RequirementStatus, Supervisor } from '../../types/records';
import ClientAutocompleteInput from '../clients/ClientAutocompleteInput';
import { phone } from '../../form/validate';
import ClientForm from './ClientForm';
import LocationAutocompleteInput from '../../form/LocationAutocompleteInput';
import ClientRequirementList from './ClientRequirementList';
import HelperList from './HelperList';
import RequirementHistory from './RequirementHistory';

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

const useChipStyles = makeStyles((theme) => ({
  label: {
    fontSize: 16,
  },
}));

interface RequirementFormState extends Requirement {
  demandIds: string[];
}

const RequirementFormLayout: FC<{ record: RequirementFormState }> = ({ record, children }) => {
  const isCreateForm = !record.id;
  const isEditForm = !isCreateForm;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={8}>
        {children}
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {isCreateForm && record.clientId && <ClientRequirementList record={record.client} />}
        {isEditForm && <RequirementHistory record={record} />}
      </Grid>
    </Grid>
  );
};

const RequirementFormBody: FC<{ record?: Requirement }> = (props) => {
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const translate = useTranslate();
  const form = useForm();
  const { values } = useFormState<RequirementFormState>();
  const dataProvider = useDataProvider();

  const handleClientClean = React.useCallback(() => {
    form.change('client', null);
    form.change('clientId', null);
    form.change('address', null);
    form.change('location', null);
  }, [form]);

  const handleClientSelect = React.useCallback(
    (client: Client | string | null) => {
      if (!client) {
        form.change('client', null);
        form.change('clientId', null);
        form.change('address', null);
        form.change('location', null);
      } else if (typeof client === 'string') {
        form.change('client', {
          firstName: null,
          lastName: null,
          yearOfBirth: null,
          age: null,
          email: null,
          phoneNumber: formatPhoneNumber(client),
        });
        form.change('clientId', null);
        form.change('address', null);
        form.change('location', null);
      } else {
        form.change('client', client);
        form.change('clientId', client.id);
        form.change('address', client.address);
        form.change('location', client.location);
      }
    },
    [form],
  );

  // Pass address and location to the new client
  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: google.maps.GeocoderResult | null) => {
      form.change('location', result ? result.geometry.location.toJSON() : null);
      if (!values.clientId) {
        form.change('client.address', result ? result.formatted_address : null);
        form.change('client.location', result ? result.geometry.location.toJSON() : null);
      }
    },
    [form, values.clientId],
  );

  React.useEffect(() => {
    if (!values.supervisorId) {
      form.change('supervisor', null);
    } else if (!values.supervisor || values.supervisor.id !== values.supervisorId) {
      dataProvider.getOne('supervisors', { id: values.supervisorId }).then((res) => {
        const supervisor = res.data as Supervisor;
        form.change('supervisor', supervisor);
      });
    }
  }, [form, dataProvider, values.supervisor, values.supervisorId]);

  const handleHelperSelect = React.useCallback(
    (helper: Helper) => {
      form.change('helper', helper);
      if (values.status === RequirementStatus.NEW) {
        // Set status to assign if it was opened
        form.change('status', RequirementStatus.PROCESSING);
      }
    },
    [form, values.status],
  );

  const handleHelperRemove = React.useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      form.change('helper', null);
      if (values.status === RequirementStatus.PROCESSING) {
        // Set status to assign if it was assigned
        form.change('status', RequirementStatus.NEW);
      }
    },
    [form, values.status],
  );

  return (
    <RequirementFormLayout {...props} record={values}>
      <Card>
        <CardContent>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} lg={6} className={classes.item}>
              {values.client ? (
                <ClientForm onDrop={handleClientClean} />
              ) : (
                <ClientAutocompleteInput
                  resource="requirements"
                  source="phoneNumber"
                  onChange={handleClientSelect}
                  autoFocus
                  validate={[required(), phone()]}
                />
              )}
              {values.client && (
                <LocationAutocompleteInput
                  resource="helpers"
                  source="address"
                  fullWidth
                  onChange={handleAddressChange}
                />
              )}
              <LocationMapInput source="location" />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <ReferenceArrayInput
                label={`resources.requirements.fields.demands`}
                reference="services"
                resource="requirements"
                source="demandIds"
                fullWidth
              >
                <CheckboxGroupInput />
              </ReferenceArrayInput>
              <TextInput resource="requirements" source="note" multiline fullWidth />
              <DateInput resource="requirements" source="supplyDate" fullWidth />
              <ReferenceInput
                label={`resources.requirements.fields.supervisor`}
                reference="supervisors"
                resource="requirements"
                source="supervisorId"
                fullWidth
                validate={required()}
              >
                <RadioButtonGroupInput choices={[]} />
              </ReferenceInput>
              {values.helper && (
                <FormControl>
                  <Typography variant={'caption'} color={'textSecondary'} gutterBottom>
                    {translate('resources.requirements.fields.helper')}
                  </Typography>
                  <Link to={`/helpers/${values.helper.id}`} onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
                    <Chip
                      classes={chipClasses}
                      icon={<HelperIcon />}
                      color={'primary'}
                      label={values.helper.name}
                      clickable
                      onDelete={handleHelperRemove}
                    />
                  </Link>
                </FormControl>
              )}
              {values.id && !values.helper && <HelperList record={values} onSelect={handleHelperSelect} />}
            </Grid>
          </Grid>
        </CardContent>
        <Toolbar {...pickToolbarProps(props)} />
      </Card>
    </RequirementFormLayout>
  );
};

const RequirementForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={RequirementFormBody} />;

export default RequirementForm;
