import { trim } from 'lodash';
import React, { FC } from 'react';
import { TextInput } from 'react-admin';
import { InputProps } from 'ra-core';
import { useFormState } from 'react-final-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldProps } from '@material-ui/core';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const getProp = (
  components: google.maps.GeocoderAddressComponent[],
  type: string,
  variant: 'long_name' | 'short_name',
): string | undefined => {
  const component = components.find((c) => c.types.includes(type));
  return component ? component[variant] : undefined;
};

export type LocationAutocompleteResult = google.maps.GeocoderResult & {
  address?: string;
  postal_code?: string;
  region?: string;
};

interface LocationAutocompleteInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: LocationAutocompleteResult | null) => void;
}

function formateocoderResult(geocoderResult: google.maps.GeocoderResult): LocationAutocompleteResult {
  const aa2 = getProp(geocoderResult.address_components, 'administrative_area_level_2', 'long_name');
  const sl1 = getProp(geocoderResult.address_components, 'sublocality_level_1', 'long_name'); // "Plzeň 1"
  const neighborhood =
    getProp(geocoderResult.address_components, 'point_of_interest', 'long_name') ||
    getProp(geocoderResult.address_components, 'neighborhood', 'long_name');
  const town = getProp(geocoderResult.address_components, 'locality', 'long_name');
  const route = getProp(geocoderResult.address_components, 'route', 'long_name');
  const streetNumber =
    getProp(geocoderResult.address_components, 'street_number', 'long_name') ||
    getProp(geocoderResult.address_components, 'premise', 'long_name');

  let addressPart = '';
  let postalCode = '';
  let region = '';

  console.log(geocoderResult.address_components);

  if (streetNumber) {
    addressPart = `${route || town} ${streetNumber}`;
    postalCode = getProp(geocoderResult.address_components, 'postal_code', 'long_name') || '';
    region = sl1 || neighborhood || town || aa2 || '';
  } else if (route) {
    addressPart = route;
    postalCode = getProp(geocoderResult.address_components, 'postal_code', 'long_name') || '';
    region = sl1 || neighborhood || town || aa2 || '';
  } else if (neighborhood) {
    addressPart = neighborhood;
    region = sl1 || town || aa2 || '';
  } else {
    region = sl1 || town || aa2 || '';
  }

  const formattedAddress = trim(`${addressPart}, ${postalCode} ${region}`, ', ').replace(/\s+/g, ' ');

  return {
    ...geocoderResult,
    formatted_address: formattedAddress,
    address: addressPart,
    postal_code: postalCode,
    region,
  };
}

const LocationAutocompleteInput: FC<Omit<InputProps<TextFieldProps>, 'onChange'> & LocationAutocompleteInputProps> = ({
  onChange,
  source,
  ...props
}) => {
  const classes = useStyles();
  const { values } = useFormState();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Array<google.maps.places.AutocompletePrediction | string>>([]);
  const [autocomplete] = React.useState(new google.maps.places.AutocompleteService());
  const [geocoder] = React.useState(new google.maps.Geocoder());

  const defaultValue = values[source];

  React.useEffect(() => {
    setInputValue(defaultValue || '');
  }, [setInputValue, defaultValue]);

  const handleChange = React.useCallback(
    (event: any, value: string) => {
      setInputValue(value);
    },
    [setInputValue],
  );

  const handleSelect = React.useCallback(
    (event: React.ChangeEvent<any>, value: google.maps.places.AutocompletePrediction | string | null) => {
      event.stopPropagation();
      event.preventDefault();
      console.log(value);
      if (value) {
        const address = typeof value === 'string' ? value : value.description;
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const result = formateocoderResult(results[0]);

            setInputValue(result.formatted_address);
            onChange(event, formateocoderResult(results[0]));
          }
        });
      } else {
        onChange(event, null);
      }
    },
    [geocoder, onChange, setInputValue],
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

    fetch({ input: inputValue }, (results) => {
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
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      value={inputValue}
      options={options}
      freeSolo
      autoSelect
      onInputChange={handleChange}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextInput
          {...props}
          {...params}
          label={`resources.${props.resource}.fields.${source}`}
          source={`${source}_tmp`}
        />
      )}
      renderOption={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
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
