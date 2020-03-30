import React, { FC } from 'react';
import {
  CheckboxGroupInput,
  DateTimeInput,
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
import { pickToolbarProps } from '../../form/utils';
import LocationMapInput from '../../form/LocationMapInput';
import { Helper, Recipient, Requirement, Supervisor } from '../../types/records';

const useStyles = makeStyles(theme => ({
  item: {
    marginBottom: theme.spacing(-2),
  },
}));

const fieldList = {
  address: 'Adresa',
  demands: 'Požadavek',
  helper: 'Dobrovolník',
  note: 'Poznámka',
  recipient: 'Klient',
  status: 'Stav',
  supervisor: 'Zajišťuje',
  supplyDate: 'Datum plnění',
};

interface RequirementFormState extends Requirement {
  recipientId: string;
  supervisorId: string;
  helperId: string;
}

const RequirementFormBody: FC<{ record?: Requirement }> = props => {
  const classes = useStyles();
  const form = useForm();
  const { values } = useFormState<RequirementFormState>();
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    if (!values.recipientId) {
      form.change('recipient', null);
      form.change('address', null);
      form.change('location', null);
    } else if (!values.recipient || values.recipient.id !== values.recipientId) {
      dataProvider.getOne('recipients', { id: values.recipientId }).then(res => {
        const recipient = res.data as Recipient;
        form.change('recipient', recipient);
        form.change('address', recipient.address);
        form.change('location', recipient.location);
      });
    }
  }, [form, values.recipient, values.recipientId]);

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
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6} className={classes.item}>
            <ReferenceInput
              label={`resources.requirements.fields.recipient`}
              reference="recipients"
              resource="requirements"
              source="recipientId"
              fullWidth
              validate={required()}
              disabled={props.record && props.record.id}
            >
              <SelectInput autoFocus />
            </ReferenceInput>
            <TextInput resource="requirements" source="address" fullWidth disabled />
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
              <RadioButtonGroupInput />
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
            <DateTimeInput resource="requirements" source="supplyDate" fullWidth />
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
  );
};

const RequirementForm: FC = props => <FormWithRedirect {...props} redirect="list" render={RequirementFormBody} />;

export default RequirementForm;
