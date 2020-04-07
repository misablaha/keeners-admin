import React, { FC } from 'react';
import {
  DateInput,
  FormWithRedirect,
  RadioButtonGroupInput,
  ReferenceInput,
  required,
  TextInput,
  Toolbar,
} from 'react-admin';
import { useDataProvider } from 'ra-core';
import { useForm, useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { formatPhoneNumber, pickToolbarProps } from '../../../form/utils';
import LocationMapInput from '../../../form/LocationMapInput';
import { Client, Demand, DemandStatus, Helper, Requirement, Supervisor } from '../../../types/records';
import ClientAutocompleteInput from '../../clients/ClientAutocompleteInput';
import { phone } from '../../../form/validate';
import ClientForm from './ClientForm';
import LocationAutocompleteInput, { LocationAutocompleteResult } from '../../../form/LocationAutocompleteInput';
import ClientRequirementList from '../ClientRequirementList';
import HelperList from './HelperList';
import HelperLabel from './HelperLabel';
import RequirementHistory from './RequirementHistory';
import DemandList from './DemandList';

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
        form.change('region', null);
        form.change('location', null);
      } else {
        form.change('client', client);
        form.change('clientId', client.id);
        form.change('address', client.address);
        form.change('region', client.region);
        form.change('location', client.location);
      }
    },
    [form],
  );

  // Pass address and location to the new client
  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: LocationAutocompleteResult | null) => {
      form.change('address', result ? result.formatted_address : null);
      form.change('region', result ? result.region : null);
      form.change('location', result ? result.geometry.location.toJSON() : null);
      if (!values.clientId) {
        form.change('client.address', result ? result.formatted_address : null);
        form.change('client.region', result ? result.region : null);
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

  const handleDemandsChange = React.useCallback(
    (demands: Partial<Demand>[]) => {
      form.change('demands', demands);
    },
    [form],
  );

  const handleHelperChange = React.useCallback(
    (ev: React.MouseEvent, helper?: Helper) => {
      ev.stopPropagation();
      ev.preventDefault();

      form.change('helperId', helper ? helper.id : null);
      form.change('helper', helper ? helper : null);

      if (helper) {
        handleDemandsChange(
          values.demands.map((d) =>
            helper.provideIds.includes(d.serviceId) ? { ...d, status: DemandStatus.SUBMITTED } : d,
          ),
        );
      }
    },
    [form, values.demands, handleDemandsChange],
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
              {values.location && <TextInput resource="requirements" source="region" disabled fullWidth />}
              {values.location && <LocationMapInput source="location" />}
            </Grid>
            <Grid item xs={12} lg={6} className={classes.item}>
              <DemandList demands={values.demands} onChange={handleDemandsChange} />
              <TextInput resource="requirements" source="note" multiline rows="3" fullWidth />
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
              {values.helper && <HelperLabel record={values.helper} onDelete={handleHelperChange} />}
              {values.id && !values.helper && <HelperList record={values} onSelect={handleHelperChange} />}
            </Grid>
          </Grid>
        </CardContent>
        <Toolbar {...pickToolbarProps(props)} submitOnEnter={false} />
      </Card>
    </RequirementFormLayout>
  );
};

const RequirementForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={RequirementFormBody} />;

export default RequirementForm;
