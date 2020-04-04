import Icon from '@material-ui/icons/Accessible';
import List from './ClientList';
import Create from './ClientCreate';
import Edit from './ClientEdit';

export default {
  name: 'clients',
  list: List,
  create: Create,
  edit: Edit,
  icon: Icon,
  title: 'resources.clients.name',
};
