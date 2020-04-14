import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  Filter,
  List,
  Pagination,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput,
} from 'react-admin';
import { CondOperator } from '@nestjsx/crud-request';
import ProvideField from './ProvideField';

const HelperFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label={`resources.helpers.fields.callSign`} source={'callSign||$eq'} alwaysOn />
    <TextInput label={`resources.helpers.fields.firstName`} source={'firstName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.lastName`} source={'lastName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.phoneNumber`} source={'phoneNumber'} alwaysOn />
    <ReferenceInput
      label={`resources.helpers.fields.provideIds`}
      reference="services"
      source="provide.id||$eq"
      alwaysOn
    >
      <SelectInput source={'name'} />
    </ReferenceInput>
    <TextInput label={`resources.helpers.fields.note`} source={'note'} alwaysOn />
    <BooleanInput label={`resources.helpers.fields.isActive`} source={`isActive||${CondOperator.EQUALS}`} />
  </Filter>
);

const HelperList = (props: any) => (
  <List
    {...props}
    filters={<HelperFilter />}
    perPage={25}
    pagination={<Pagination rowsPerPageOptions={[25, 50, 100, 250]} />}
    sort={{ field: 'callSign', order: 'DESC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <TextField source="callSign" emptyText={' '} />
      <TextField source="firstName" emptyText={' '} />
      <TextField source="lastName" emptyText={' '} />
      <TextField source="phoneNumber" emptyText={' '} noWrap />
      <ProvideField />
      <TextField source="address" emptyText={' '} />
      <TextField source="note" emptyText={' '} />
      <BooleanField source="isActive" />
    </Datagrid>
  </List>
);

export default HelperList;
