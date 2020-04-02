import React, { FC } from 'react';
import { NumberInput, required, TextInput } from 'react-admin';
import { useForm, useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { phone } from '../../form/validate';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 0,
    marginTop: 0,
  },
  item: {
    paddingBottom: '0!important',
    paddingTop: '0!important',
  },
}));

const RecipientForm: FC<{ onDrop: () => void }> = props => {
  const classes = useStyles();
  const form = useForm();
  const { values } = useFormState();

  const handleAgeChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const year = ev.target.value ? new Date().getFullYear() - parseInt(ev.target.value, 10) : null;
      form.change('recipient.yearOfBirth', year);
    },
    [form],
  );

  const handleYearOfBirthChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const age = ev.target.value ? new Date().getFullYear() - parseInt(ev.target.value, 10) : null;
      form.change('recipient.age', age);
    },
    [form],
  );

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={9} lg={9} className={classes.item}>
        <TextInput
          label={'resources.recipients.fields.phoneNumber'}
          resource="recipients"
          source="recipient.phoneNumber"
          fullWidth
          disabled={values.recipient.id}
          validate={[required(), phone()]}
        />
      </Grid>
      <Grid item xs={3} lg={3} className={classes.item}>
        {!values.id && (
          <FormControl margin={'dense'}>
            <IconButton color="primary" onClick={props.onDrop}>
              <CancelIcon />
            </IconButton>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <TextInput
          label={'resources.recipients.fields.firstName'}
          resource="recipients"
          source="recipient.firstName"
          fullWidth
          autoFocus
        />
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <TextInput
          label={'resources.recipients.fields.lastName'}
          resource="recipients"
          source="recipient.lastName"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.item}>
        <NumberInput
          label={'resources.recipients.fields.age'}
          resource="recipients"
          source="recipient.age"
          fullWidth
          onChange={handleAgeChange}
        />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.item}>
        <NumberInput
          label={'resources.recipients.fields.yearOfBirth'}
          resource="recipients"
          source="recipient.yearOfBirth"
          fullWidth
          onChange={handleYearOfBirthChange}
        />
      </Grid>
    </Grid>
  );
};

export default RecipientForm;