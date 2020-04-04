import React, { FC } from 'react';
import { TextInput } from 'react-admin';
import { InputProps, useGetList } from 'ra-core';
import { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Fuse, { IFuseOptions } from 'fuse.js';
import { Client } from '../../types/records';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const fuseOptions: IFuseOptions<Client> = {
  includeMatches: true,
  includeScore: false,
  minMatchCharLength: 3,
  keys: ['name', 'firstName', 'lastName', 'phoneNumber'],
};

function parse(text: string, matches: ReadonlyArray<[number, number]>) {
  const result = [];

  if (matches.length === 0) {
    result.push({
      text: text,
      highlight: false,
    });
  } else {
    if (matches[0][0] > 0) {
      result.push({
        text: text.slice(0, matches[0][0]),
        highlight: false,
      });
    }
  }

  matches.forEach(function (match, i) {
    const startIndex = match[0];
    const endIndex = match[1] + 1;

    result.push({
      text: text.slice(startIndex, endIndex),
      highlight: true,
    });

    if (i === matches.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: text.slice(endIndex, text.length),
          highlight: false,
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      result.push({
        text: text.slice(endIndex, matches[i + 1][0]),
        highlight: false,
      });
    }
  });

  return result;
}

type ClientFuseResult = Fuse.FuseResult<Client>;

const Highlight: FC<{ option: ClientFuseResult; field: string }> = ({ option, field }) => {
  const match = option.matches && option.matches.find((v) => v.key === field);
  const parts = parse(option.item[field], match ? match.indices : []);
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
          {part.text}
        </span>
      ))}
    </span>
  );
};

type Props = Omit<InputProps<TextFieldProps> & TextFieldProps, 'label' | 'helperText' | 'onChange'> & {
  resource?: string;
  source?: string;
  freeSolo?: boolean;
  onChange: (selected: Client | string | null) => void;
  getOptionLabel?: (option: ClientFuseResult | string) => string;
};

const ClientAutocompleteInput: FC<Props> = ({ getOptionLabel, freeSolo, onChange, ...rest }) => {
  const classes = useStyles();
  const clients = useGetList<Client>('clients', { perPage: 5000, page: 1 }, { field: 'id', order: 'ASC' }, {});
  const [fuse, setFuse] = React.useState<Fuse<Client, typeof fuseOptions>>(new Fuse([], fuseOptions));
  const [options, setOptions] = React.useState<ClientFuseResult[]>([]);

  React.useEffect(() => {
    const data = clients.data ? Object.values(clients.data) : [];
    setFuse(new Fuse(data, fuseOptions));
  }, [clients.data, clients.loading, setFuse, setOptions]);

  const handleChange = React.useCallback(
    (event: any, value: string) => {
      setOptions(fuse.search(value));
    },
    [fuse, setOptions],
  );

  const handleSelect = React.useCallback(
    (ev: any, value: ClientFuseResult | null | string) => {
      if (value && typeof value === 'object') {
        onChange(value.item);
      } else {
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <Autocomplete
      options={options}
      getOptionLabel={
        getOptionLabel ||
        ((option: ClientFuseResult | string) => (typeof option === 'string' ? option : option.item.phoneNumber))
      }
      filterOptions={(x) => x}
      freeSolo
      multiple={false}
      onInputChange={handleChange}
      onChange={handleSelect}
      renderInput={(params) => <TextInput {...params} {...rest} />}
      renderOption={(option: ClientFuseResult) => (
        <Box display="flex" alignItems="center">
          <PhoneIcon className={classes.icon} fontSize="small" color="action" />
          <Highlight option={option} field={'phoneNumber'} />
          <AccountCircleIcon className={classes.icon} fontSize="small" color="action" />
          <Highlight option={option} field={'name'} />
        </Box>
      )}
    />
  );
};

export default ClientAutocompleteInput;
