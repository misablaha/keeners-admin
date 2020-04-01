import pick from 'lodash/pick';
import { AnyObject } from '../types/core';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const pickToolbarProps = (props: AnyObject) =>
  pick(props, [
    'basePath',
    'children',
    'classes',
    'className',
    'handleSubmit',
    'handleSubmitWithRedirect',
    'invalid',
    'pristine',
    'record',
    'redirect',
    'resource',
    'saving',
    'submitOnEnter',
    'undoable',
    'width',
  ]);

export const formatPhoneNumber = (phoneNumber: string): string => {
  let formattedPhone = phoneNumber;
  try {
    const phone = phoneUtil.parseAndKeepRawInput(phoneNumber, 'CZ');
    formattedPhone = phoneUtil.format(phone, PhoneNumberFormat.INTERNATIONAL);
  } catch (e) {
    // do nothing
  }
  return formattedPhone;
};
