import Icon from '@material-ui/icons/Accessible';
import List from './RecipientList';
import Create from './RecipientCreate';
import Edit from './RecipientEdit';

export default {
  name: 'recipients',
  list: List,
  create: Create,
  edit: Edit,
  icon: Icon,
  title: 'resources.recipients.name',
};
