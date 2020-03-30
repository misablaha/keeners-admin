import { ValidationErrorMessage, Validator } from 'ra-core';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isEmpty = (value: any) =>
  typeof value === 'undefined' || value === null || value === '' || (Array.isArray(value) && value.length === 0);

const isPhone = (value: string): boolean => {
  try {
    phoneUtil.parseAndKeepRawInput(value, 'CZ');
    return true;
  } catch (e) {
    return false;
  }
};

interface MessageFuncParams {
  args: any;
  value: any;
  values: any;
}

type MessageFunc = (params: MessageFuncParams) => ValidationErrorMessage;

const getMessage = (message: string | MessageFunc, messageArgs: any, value: any, values: any) =>
  typeof message === 'function'
    ? message({
        args: messageArgs,
        value,
        values,
      })
    : messageArgs
    ? {
        message,
        args: messageArgs,
      }
    : message;

export const phone = (message = 'ra.validation.phone'): Validator => (value: any, values: { [name: string]: any }) => {
  return !isEmpty(value) && !isPhone(value) ? getMessage(message, undefined, value, values) : undefined;
};
