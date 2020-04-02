import React, { FC } from 'react';
import { TextInput } from 'react-admin';
import { InputProps } from 'ra-core';
import { useForm } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldProps } from '@material-ui/core';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface LocationAutocompleteInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: google.maps.GeocoderResult | null) => void;
}

const LocationAutocompleteInput: FC<Omit<InputProps<TextFieldProps>, 'onChange'> & LocationAutocompleteInputProps> = ({
  onChange,
  source,
  ...props
}) => {
  const classes = useStyles();
  const form = useForm();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Array<google.maps.places.AutocompletePrediction | string>>([]);
  const [autocomplete] = React.useState(new google.maps.places.AutocompleteService());
  const [geocoder] = React.useState(new google.maps.Geocoder());

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value);
    },
    [setInputValue],
  );

  const handleSelect = React.useCallback(
    (event: React.ChangeEvent<any>, value: google.maps.places.AutocompletePrediction | string | null) => {
      if (value && typeof value !== 'string') {
        geocoder.geocode({ placeId: value.place_id }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            form.change(source, value.description);
            onChange(event, results[0]);
          }
        });
      } else {
        form.change(source, null);
        onChange(event, null);
      }
    },
    [geocoder, form, source, onChange],
  );

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          input: google.maps.places.AutocompletionRequest,
          callback: (
            result: google.maps.places.AutocompletePrediction[],
            status: google.maps.places.PlacesServiceStatus,
          ) => void,
        ): void => {
          autocomplete.getPlacePredictions(input, callback);
        },
        300,
      ),
    [autocomplete],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      defaultValue={form.getState().values[source]}
      options={options}
      autoComplete
      forcePopupIcon={false}
      includeInputInList
      onChange={handleSelect}
      renderInput={params => (
        <TextInput
          {...props}
          {...params}
          label={`resources.${props.resource}.fields.${source}`}
          source={`${source}_tmp`}
          onChange={handleChange}
          onBlur={console.log}
        />
      )}
      renderOption={option => {
        if (typeof option === 'string') {
          return option;
        }
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default LocationAutocompleteInput;
