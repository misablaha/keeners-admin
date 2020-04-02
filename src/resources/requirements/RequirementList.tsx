import React from 'react';
import {
  Datagrid,
  DateField,
  DateInput,
  Filter,
  List,
  ReferenceInput,
  SelectField,
  SelectInput,
  TextField,
} from 'react-admin';
import DemandsField from './DemandsField';
import RecipientLinkField from './RecipientLinkField';
import HelperLinkField from './HelperLinkField';
import SupervisorLinkField from './SupervisorLinkField';
import requirementStatuses from './requirementStatuses';

const RequirementFilter = (props: any) => (
  <Filter {...props}>
    <DateInput label={`resources.requirements.filters.createdTimeGte`} source="createdTime||gte" alwaysOn />
    <ReferenceInput
      label={`resources.requirements.fields.supervisor`}
      reference="supervisors"
      source="supervisorId"
      alwaysOn
    >
      <SelectInput source={'name'} />
    </ReferenceInput>
    <SelectInput
      label={`resources.requirements.fields.status`}
      source={'status'}
      choices={requirementStatuses}
      alwaysOn
    />
  </Filter>
);

const RequirementList = (props: any) => (
  <List {...props} filters={<RequirementFilter />} perPage={25} sort={{ field: 'createdTime', order: 'DESC' }}>
    <Datagrid optimized rowClick="edit">
      <DateField source="createdTime" showTime />
      <RecipientLinkField />
      <TextField label={`resources.recipients.fields.age`} source="recipient.age" sortable={false} noWrap />
      <TextField label={`resources.recipients.fields.phoneNumber`} source="recipient.phoneNumber" sortable={false} />
      <DemandsField />
      <DateField source="supplyDate" showTime />
      <HelperLinkField />
      <SupervisorLinkField />
      <SelectField source="status" choices={requirementStatuses} sortable={false} />
    </Datagrid>
  </List>
);

export default RequirementList;
