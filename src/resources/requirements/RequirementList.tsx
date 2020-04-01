import React from 'react';
import { Datagrid, DateField, Filter, List, SelectField, TextField } from 'react-admin';
import DemandsField from './DemandsField';
import RecipientLinkField from './RecipientLinkField';
import HelperLinkField from './HelperLinkField';
import SupervisorLinkField from './SupervisorLinkField';
import requirementStatuses from './requirementStatuses';

const RequirementFilter = (props: any) => (
  <Filter {...props}>
    {/*<TextInput label={`resources.requirements.fields.firstName`} source={'firstName'} alwaysOn />*/}
    {/*<TextInput label={`resources.requirements.fields.lastName`} source={'lastName'} alwaysOn />*/}
    {/*<TextInput label={`resources.requirements.fields.phoneNumber`} source={'phoneNumber'} alwaysOn />*/}
    {/*<BooleanInput label={`resources.requirements.fields.isActive`} source={`isActive||${CondOperator.EQUALS}`} />*/}
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
