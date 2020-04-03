import React, { FC, Fragment } from 'react';
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
import { Helper, Recipient, Requirement, RequirementStatus, Supervisor } from '../../types/records';
import RecipientAutocompleteInput from '../recipients/RecepientAutocompleteInput';
import { phone } from '../../form/validate';
import RecipientForm from './RecipientForm';
import LocationAutocompleteInput from '../../form/LocationAutocompleteInput';
import RecipientRequirementList from './RecipientRequirementList';
import HelperList from './HelperList';
import RequirementHistory from './RequirementHistory';

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

const useChipStyles = makeStyles(theme => ({
  label: {
    fontSize: 16,
  },
}));

interface RequirementFormState extends Requirement {
  demandIds: string[];
  helperId: string;
  recipientId: string;
  supervisorId: string;
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
        {isCreateForm && record.recipientId && <RecipientRequirementList record={record.recipient} />}
        {isEditForm && <RequirementHistory record={record} />}
      </Grid>
    </Grid>
  );
};

const RequirementFormBody: FC<{ record?: Requirement }> = props => {
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const translate = useTranslate();
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
      form.change('location', result ? result.geometry.location.toJSON() : null);
      if (!values.recipientId) {
        form.change('recipient.address', result ? result.formatted_address : null);
        form.change('recipient.location', result ? result.geometry.location.toJSON() : null);
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

  const handleHelperSelect = React.useCallback(
    (helper: Helper) => {
      form.change('helper', helper);
      if (values.status === RequirementStatus.OPEN) {
        // Set status to assign if it was opened
        form.change('status', RequirementStatus.ASSIGN);
      }
    },
    [form, values.status],
  );

  const handleHelperRemove = React.useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      form.change('helper', null);
      if (values.status === RequirementStatus.ASSIGN) {
        // Set status to assign if it was assigned
        form.change('status', RequirementStatus.OPEN);
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
              {values.helper ? (
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
              ) : (
                <HelperList record={values} onSelect={handleHelperSelect} />
              )}
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
