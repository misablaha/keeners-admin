import React, { FC } from 'react';
import { Datagrid, DateField, List, RichTextField, SelectField, Show, ShowButton, SimpleShowLayout } from 'react-admin';
import DemandsField from './DemandsField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { Recipient } from '../../types/records';
import HelperLinkField from './HelperLinkField';
import SupervisorLinkField from './SupervisorLinkField';
import requirementStatuses from './requirementStatuses';

const RequirementShow: FC = props => (
  <Show
    {...props}
    /* disable the app title change when shown */
    title=" "
  >
    <SimpleShowLayout>
      <RichTextField source="note" />
      <DemandsField />
      <DateField source="supplyDate" showTime />
      <HelperLinkField />
      <SupervisorLinkField />
      <SelectField source="status" choices={requirementStatuses} sortable={false} />
    </SimpleShowLayout>
  </Show>
);

const RecipientRequirementList: FC<{ record: Partial<Recipient> }> = ({ record }) => (
  <Card>
    <CardHeader title="Poslední požadavky" subheader={record.name} />
    <Divider />
    <List
      basePath={'/requirements'}
      resource={'requirements'}
      title={' '}
      component={'div'}
      filter={{ 'recipientId||$eq': record.id }}
      sort={{ field: 'createdTime', order: 'DESC' }}
      perPage={15}
      bulkActionButtons={false}
      exporter={false}
      actions={null}
      pagination={null}
      hasCreate={false}
      hasEdit={false}
      hasShow={false}
      hasList={true}
    >
      <Datagrid optimized rowClick="expand" expand={<RequirementShow />}>
        <DateField source="createdTime" showTime />
        <DemandsField />
        <SelectField source="status" choices={requirementStatuses} sortable={false} />
        <ShowButton />
      </Datagrid>
    </List>
  </Card>
);

export default RecipientRequirementList;
