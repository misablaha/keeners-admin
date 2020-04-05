import { RequirementStatus } from '../../types/records';

export default [
  { id: RequirementStatus.NEW, name: 'resources.requirements.statuses.new' },
  { id: RequirementStatus.PROCESSING, name: 'resources.requirements.statuses.processing' },
  { id: RequirementStatus.DONE, name: 'resources.requirements.statuses.done' },
  { id: RequirementStatus.CANCELED, name: 'resources.requirements.statuses.canceled' },
];
