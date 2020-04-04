import { RequirementStatus } from '../../types/records';

export default [
  { id: RequirementStatus.NEW, name: 'resources.requirements.statuses.open' },
  { id: RequirementStatus.PROCESSING, name: 'resources.requirements.statuses.assign' },
  { id: RequirementStatus.DONE, name: 'resources.requirements.statuses.done' },
  { id: RequirementStatus.CANCELED, name: 'resources.requirements.statuses.cancel' },
];
