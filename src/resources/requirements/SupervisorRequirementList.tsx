import React, { FC } from 'react';
import { Datagrid, DateField, List, RichTextField, Show, ShowButton, SimpleShowLayout } from 'react-admin';
import DemandsField from './DemandsField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { Supervisor } from '../../types/records';
import ClientLinkField from './ClientLinkField';
import HelperLinkField from './HelperLinkField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

const RequirementShow: FC = (props) => (
  <Show
    {...props}
    /* disable the app title change when shown */
    title=" "
  >
    <SimpleShowLayout>
      <RichTextField source="note" />
      <DemandsField />
      <DateField source="supplyDate" showTime />
      <ClientLinkField />
      <HelperLinkField />
    </SimpleShowLayout>
  </Show>
);

const SupervisorRequirementList: FC<{ record: Partial<Supervisor> }> = ({ record }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Poslední požadavky" subheader={record.name} />
      <Divider />
      <List
        basePath={'/requirements'}
        resource={'requirements'}
        title={' '}
        component={'div'}
        filter={{ supervisorId: record.id }}
        sort={{ field: 'createdAt', order: 'DESC' }}
        perPage={10}
        bulkActionButtons={false}
        exporter={false}
        actions={null}
        hasCreate={false}
        hasEdit={false}
        hasShow={false}
        hasList={true}
      >
        <Datagrid optimized rowClick="expand" expand={<RequirementShow />}>
          <DateField cellClassName={classes.cell} headerClassName={classes.cell} source="createdAt" showTime />
          <DemandsField cellClassName={classes.cell} headerClassName={classes.cell} />
          <ClientLinkField cellClassName={classes.cell} headerClassName={classes.cell} />
          <ShowButton cellClassName={classes.cell} headerClassName={classes.cell} />
        </Datagrid>
      </List>
    </Card>
  );
};

export default SupervisorRequirementList;
