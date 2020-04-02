import React, { FC, Fragment } from 'react';
import {
  CheckboxGroupInput,
  DateInput,
  FormWithRedirect,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectInput,
  TextInput,
  Toolbar,
} from 'react-admin';
import { useDataProvider } from 'ra-core';
import { useForm, useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { formatPhoneNumber, pickToolbarProps } from '../../form/utils';
import LocationMapInput from '../../form/LocationMapInput';
import { Helper, Recipient, Requirement, Supervisor } from '../../types/records';
import RecipientAutocompleteInput from '../recipients/RecepientAutocompleteInput';
import { phone } from '../../form/validate';
import RecipientForm from './RecipientForm';
import LocationAutocompleteInput from '../../form/LocationAutocompleteInput';
import RecipientRequirementList from './RecipientRequirementList';

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

interface RequirementFormState extends Requirement {
  recipientId: string;
  supervisorId: string;
  helperId: string;
}

const RequirementFormLayout: FC<{ record: RequirementFormState }> = ({ record, children }) => {
  if (record.id) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={8}>
        {children}
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {record.recipientId && <RecipientRequirementList record={record.recipient} />}
      </Grid>
    </Grid>
  );
};

const RequirementFormBody: FC<{ record?: Requirement }> = props => {
  const classes = useStyles();
  const form = useForm();
  const { values } = useFormState<RequirementFormState>();
  const dataProvider = useDataProvider();

  const handleRecipientClean = React.useCallback(() => {
    form.change('recipient', null);
    form.change('recipientId', null);
    form.change('address', null);
    form.change('location', null);
  }, [form]);

  const handleRecipientSelect = React.useCallback(
    (recipient: Recipient | string | null) => {
      console.log(recipient);
      if (!recipient) {
        form.change('recipient', null);
        form.change('recipientId', null);
        form.change('address', null);
        form.change('location', null);
      } else if (typeof recipient === 'string') {
        form.change('recipient', {
          firstName: null,
          lastName: null,
          yearOfBirth: null,
          age: null,
          email: null,
          phoneNumber: formatPhoneNumber(recipient),
        });
        form.change('recipientId', null);
        form.change('address', null);
        form.change('location', null);
      } else {
        form.change('recipient', recipient);
        form.change('recipientId', recipient.id);
        form.change('address', recipient.address);
        form.change('location', recipient.location);
      }
    },
    [form],
  );

  // Pass address and location to the new recipient
  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, result: google.maps.GeocoderResult | null) => {
      form.change('location', result ? result.geometry.location : null);
      if (!values.recipientId) {
        form.change('recipient.address', result ? result.formatted_address : null);
        form.change('recipient.location', result ? result.geometry.location : null);
      }
    },
    [form, values.recipientId],
  );

  React.useEffect(() => {
    if (!values.supervisorId) {
      form.change('supervisor', null);
    } else if (!values.supervisor || values.supervisor.id !== values.supervisorId) {
      dataProvider.getOne('supervisors', { id: values.supervisorId }).then(res => {
        const supervisor = res.data as Supervisor;
        form.change('supervisor', supervisor);
      });
    }
  }, [form, values.supervisor, values.supervisorId]);

  React.useEffect(() => {
    if (!values.helperId) {
      form.change('helper', null);
    } else if (!values.helper || values.helper.id !== values.helperId) {
      dataProvider.getOne('helpers', { id: values.helperId }).then(res => {
        const helper = res.data as Helper;
        form.change('helper', helper);
      });
    }
  }, [form, values.helper, values.helperId]);

  return (
    <RequirementFormLayout {...props} record={values}>
      <Card>
        <CardContent>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} lg={6} className={classes.item}>
              {values.recipient ? (
                <RecipientForm onDrop={handleRecipientClean} />
              ) : (
                <RecipientAutocompleteInput
                  resource="requirements"
                  source="phoneNumber"
                  onChange={handleRecipientSelect}
                  autoFocus
                  validate={[required(), phone()]}
                />
              )}
              {values.recipient && (
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
              <TextInput resource="requirements" source="note" multiline fullWidth />
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
              <ReferenceArrayInput
                label={`resources.requirements.fields.demands`}
                reference="services"
                resource="requirements"
                source="demandIds"
                fullWidth
              >
                <CheckboxGroupInput />
              </ReferenceArrayInput>
              <DateInput resource="requirements" source="supplyDate" fullWidth />
              <ReferenceInput
                label={`resources.requirements.fields.helper`}
                reference="helpers"
                resource="requirements"
                source="helperId"
                fullWidth
              >
                <SelectInput resettable />
              </ReferenceInput>
            </Grid>
          </Grid>
        </CardContent>
        <Toolbar {...pickToolbarProps(props)} />
      </Card>
    </RequirementFormLayout>
  );
};

const RequirementForm: FC = props => <FormWithRedirect {...props} redirect="list" render={RequirementFormBody} />;

export default RequirementForm;
