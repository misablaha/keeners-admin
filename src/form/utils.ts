import pick from 'lodash/pick';
import { AnyObject } from '../types';

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
