import React, { FC } from 'react';
import { Datagrid, DateField, List, RichTextField, Show, ShowButton, SimpleShowLayout } from 'react-admin';
import DemandsField from './DemandsField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { Helper } from '../../types/records';
import SupervisorLinkField from './SupervisorLinkField';
import ClientLinkField from './ClientLinkField';
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
      <SupervisorLinkField />
    </SimpleShowLayout>
  </Show>
);

const HelperRequirementList: FC<{ record: Partial<Helper> }> = ({ record }) => {
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
        filter={{ helperId: record.id }}
        sort={{ field: 'createdTime', order: 'DESC' }}
        perPage={15}
        bulkActionButtons={false}
        exporter={false}
        actions={null}
        hasCreate={false}
        hasEdit={false}
        hasShow={false}
        hasList={true}
      >
        <Datagrid optimized rowClick="expand" expand={<RequirementShow />}>
          <DateField cellClassName={classes.cell} headerClassName={classes.cell} source="createdTime" showTime />
          <DemandsField cellClassName={classes.cell} headerClassName={classes.cell} />
          <ClientLinkField cellClassName={classes.cell} headerClassName={classes.cell} />
          <ShowButton cellClassName={classes.cell} headerClassName={classes.cell} />
        </Datagrid>
      </List>
    </Card>
  );
};

export default HelperRequirementList;
