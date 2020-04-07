import React, { FC, Fragment } from 'react';
import { FormWithRedirect, required, TextInput, Toolbar } from 'react-admin';
import { Supervisor } from '../../types/records';
import Grid from '@material-ui/core/Grid';
import SupervisorRequirementList from '../requirements/SupervisorRequirementList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { pickToolbarProps } from '../../form/utils';

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
      <CardContent>
        <TextInput resource="supervisors" source="name" validate={required()} autoFocus fullWidth />
      </CardContent>
      <Toolbar {...pickToolbarProps(props)} submitOnEnter={false} />
    </Card>
  </SupervisorFormLayout>
);

const SupervisorForm: FC = (props) => <FormWithRedirect {...props} redirect="list" render={SupervisorFormBody} />;

export default SupervisorForm;
