import React, { FC, Fragment } from 'react';
import { useForm } from 'react-final-form';
import { InputProps } from 'ra-core';
import { DateInput, RadioButtonGroupInput } from 'react-admin';
import { TextFieldProps } from '@material-ui/core/TextField';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

enum Delay {
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  LATER = 'later',
}

const SupplyDateInput: FC<InputProps<TextFieldProps>> = (props) => {
  const form = useForm();
  const [delay, setDelay] = React.useState<Delay>(Delay.TODAY);

  React.useEffect(() => {
    if (delay === Delay.TODAY) {
      form.change(props.source, moment().startOf('d').toISOString());
    } else if (delay === Delay.TOMORROW) {
      form.change(props.source, moment().startOf('d').add(1, 'day').toISOString());
    }
  }, [delay, props.source]);

  return (
    <Fragment>
      <RadioButtonGroupInput
        {...props}
        source="supplyDateDelay"
        defaultValue={delay}
        onChange={setDelay}
        choices={[
          { id: Delay.TODAY, name: 'resources.requirements.supplyDateDelays.today' },
          { id: Delay.TOMORROW, name: 'resources.requirements.supplyDateDelays.tomorrow' },
          { id: Delay.LATER, name: 'resources.requirements.supplyDateDelays.later' },
        ]}
      />
      {delay === Delay.LATER && <DateInput {...props} />}
    </Fragment>
  );
};

export default SupplyDateInput;
