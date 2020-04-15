import { debounce, difference, filter, forEach, intersection } from 'lodash';
import { getDistance } from 'geolib';
import React, { FC, Fragment } from 'react';
import { Datagrid, NumberField, TextField } from 'react-admin';
import { RecordMap } from 'ra-core/esm/types';
import { useGetList } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiTextField from '@material-ui/core/TextField';
import { DemandStatus, Helper, Requirement } from '../../../types/records';
import HelperLinkField from '../../helpers/HelperLinkField';
import AssignButton from './AssignButton';
import Fuse, { IFuseOptions } from 'fuse.js';
import HelperActivityField from './HelperActivityField';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  content: {
    padding: 0,
  },
}));

const fuseOptions: IFuseOptions<Helper> = {
  includeMatches: true,
  includeScore: false,
  minMatchCharLength: 3,
  threshold: 0.3,
  keys: ['name', 'note', 'phoneNumber'],
};

const HelperList: FC<{ record: Requirement; onSelect: (ev: React.MouseEvent, helper: Helper) => void }> = ({
  record,
  onSelect,
}) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState<string>();
  const [fuse, setFuse] = React.useState<Fuse<Helper, typeof fuseOptions>>(new Fuse([], fuseOptions));
  const helpers = useGetList<Helper>(
    'helpers',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isActive||$eq': true },
  );
  const [ids, setIds] = React.useState<Array<string>>([]);
  const [data, setData] = React.useState<RecordMap<Helper>>({});

  React.useEffect(() => {
    const data = helpers.data ? Object.values(helpers.data) : [];
    setFuse(new Fuse(data, fuseOptions));
    setData(helpers.data || {});
  }, [helpers.loaded, setData, setFuse]);

  React.useEffect(() => {
    const required: string[] = (record.demands || [])
      .filter((d) => d.status !== DemandStatus.CANCELED)
      .map((d) => d.service)
      .filter((s) => !s.isInternal)
      .map((s) => s.id);

    if (required.length === 0 || !record.location) {
      // Nothing is needed ... Do not offer helpers
      setIds([]);
    } else {
      forEach(data, (h) => {
        Object.assign(h, { distance: h.location ? getDistance(record.location, h.location) : Number.NaN });
      });

      // Filter helpers that provide all required services
      // difference([1,2,3], [1,2]) => [ 3 ]
      // difference([1,2,3], [1,2,3,4]) => []
      const ids = filter(data, (h) => difference(required, h.provideIds).length === 0)
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .map((h) => h.id);

      if (search) {
        setIds(
          intersection(
            ids,
            fuse.search(search).map((f) => f.item.id),
          ),
        );
      } else {
        setIds(ids.slice(0, 50));
      }
    }
  }, [data, search, fuse, record.demands, record.location, setIds]);

  const doSearch = React.useMemo(
    () =>
      debounce((val: string): void => {
        setSearch(val);
      }, 500),
    [setSearch],
  );

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    doSearch(ev.target.value);
  };

  return helpers.loading ? (
    <LinearProgress />
  ) : (
    <Fragment>
      <MuiTextField
        label="Search field"
        type="search"
        margin={'dense'}
        variant={'filled'}
        style={{ marginLeft: 16, marginRight: 16 }}
        onChange={handleSearch}
        autoFocus
      />
      <DialogContent className={classes.content}>
        <Datagrid
          {...helpers}
          data={data}
          ids={ids}
          currentSort={{ field: 'distance', order: 'ASC' }}
          optimized
          hasBulkActions={false}
          rowClick={null}
          selectedIds={[]}
        >
          <HelperLinkField cellClassName={classes.cell} headerClassName={classes.cell} />
          <TextField
            cellClassName={classes.cell}
            headerClassName={classes.cell}
            label={`resources.helpers.fields.note`}
            source="note"
            emptyText={' '}
            sortable={false}
          />
          <NumberField
            cellClassName={classes.cell}
            headerClassName={classes.cell}
            label={`resources.helpers.fields.distance`}
            source="distance"
            sortable={false}
          />
          <HelperActivityField cellClassName={classes.cell} headerClassName={classes.cell} />
          <AssignButton cellClassName={classes.cell} headerClassName={classes.cell} onClick={onSelect} />
        </Datagrid>
      </DialogContent>
    </Fragment>
  );
};

export default HelperList;
