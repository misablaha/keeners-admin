import { Record, ReduxState } from 'ra-core';

export type ThemeName = 'light' | 'dark';
export type FontSize = 'medium' | 'large';

export interface AppState extends ReduxState {
  theme: ThemeName;
  fontSize:  FontSize;
}

export interface AnyObject {
  [key: string]: any;
}

export interface InjectedFieldProps<T extends Record = Record> {
  basePath?: string;
  record?: T;
}

type TextAlign = 'right' | 'left';
export interface FieldProps<T extends Record = Record> extends InjectedFieldProps<T> {
  addLabel?: boolean;
  cellClassName?: string;
  className?: string;
  headerClassName?: string;
  label?: string;
  sortBy?: string;
  sortable?: boolean;
  source?: string;
  resource?: string;
  textAlign?: TextAlign;
}
