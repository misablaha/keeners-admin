import { Record } from 'ra-core';

export enum DemandStatus {
  NEW = 'new',
  SUBMITTED = 'submitted',
  DONE = 'done',
  CANCELED = 'canceled',
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

export interface Client extends BaseRecord {
  firstName?: string;
  lastName?: string;
  readonly name: string;
  yearOfBirth?: number;
  readonly age: number;
  email?: string;
  phoneNumber: string;
  address: string;
  region: string;
  location: GpsPoint;
  note: string;
  requirements: Requirement[];
}

export interface Helper extends BaseRecord {
  callSign: string;
  firstName: string;
  lastName: string;
  readonly name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  address: string;
  region: string;
  location: GpsPoint;
  note: string;
  provide: Service[];
  provideIds: string[];
  requirements: Requirement[];
}

export interface Demand extends BaseRecord {
  requirementId: string;
  requirement: Requirement;
  serviceId: string;
  service: Service;
  status: DemandStatus;
}

export interface Requirement extends BaseRecord {
  address: string;
  client: Client;
  clientId: string;
  demands: Demand[];
  helper: Helper;
  helperId: string;
  location: GpsPoint;
  note: string;
  region: string;
  supervisor: Supervisor;
  supervisorId: string;
  supplyDate: Date;
}
