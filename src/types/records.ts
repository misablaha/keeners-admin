import { Record } from 'ra-core';

export enum RequirementStatus {
  OPEN = 'open',
  ASSIGN = 'assign',
  DONE = 'done',
  CANCEL = 'cancel',
}

export interface GpsPoint {
  lat: number;
  lng: number;
}

export interface BaseRecord extends Record {
  id: string;
  createdTime: Date;
  updatedTime: Date;
}

export interface Supervisor extends BaseRecord {
  name: string;
}

export interface Service extends BaseRecord {
  name: string;
  note: string;
  isInternal: boolean;
}

export interface Recipient extends BaseRecord {
  firstName?: string;
  lastName?: string;
  readonly name: string;
  yearOfBirth?: number;
  readonly age: number;
  email?: string;
  phoneNumber: string;
  address: string;
  location: GpsPoint;
  note: string;
  requirements: Requirement[];
}

export interface Helper extends BaseRecord {
  firstName: string;
  lastName: string;
  readonly name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  address: string;
  location: GpsPoint;
  note: string;
  provide: Service[];
  provideIds: number[];
  requirements: Requirement[];
}

export interface Requirement extends BaseRecord {
  recipient: Recipient;
  address: string;
  location: GpsPoint;
  demands: Service[];
  note: string;
  supplyDate: Date;
  supervisor: Supervisor;
  helper: Helper;
  status: RequirementStatus;
}
