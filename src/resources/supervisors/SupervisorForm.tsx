import React, { FC, Fragment } from 'react';
import { FormWithRedirect, required, TextInput } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SupervisorRequirementList from '../requirements/SupervisorRequirementList';
import { Supervisor } from '../../types/records';
import Toolbar from '../../form/Toolbar';

const SupervisorFormLayout: FC<{ record: Partial<Supervisor> }> = ({ record, children }) => {
  return record.id ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
      <Grid item xs={12} md={6}>
        <SupervisorRequirementList record={record} />
      </Grid>
    </Grid>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const SupervisorFormBody: FC<{ record: Partial<Supervisor> }> = (props) => (
  <SupervisorFormLayout record={props.record}>
    <Card>
      <Toolbar {...props} />
      <CardContent>
        <TextInput resource="supervisors" source="name" validate={required()} autoFocus fullWidth />
      </CardContent>
    </Card>
  </SupervisorFormLayout>
);

const SupervisorForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={SupervisorFormBody} />;

export default SupervisorForm;
