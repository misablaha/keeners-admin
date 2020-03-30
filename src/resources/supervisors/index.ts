import Icon from '@material-ui/icons/Domain';
import List from './SupervisorList';
import Create from './SupervisorCreate';
import Edit from './SupervisorEdit';

export default {
  name: 'supervisors',
  list: List,
  create: Create,
  edit: Edit,
  icon: Icon,
  title: 'resources.admin.name',
};
