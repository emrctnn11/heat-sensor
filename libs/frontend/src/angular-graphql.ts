import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export class Scalars {
  ID!: { input: string; output: string; };
  String!: { input: string; output: string; };
  Boolean!: { input: boolean; output: boolean; };
  Int!: { input: number; output: number; };
  Float!: { input: number; output: number; };
};

export class DeviceHeatSensorObjectType {
  __typename?: 'DeviceHeatSensorObjectType';
  id!: Scalars['Int']['output'];
  temperature?: Maybe<Scalars['Float']['output']>;
  updatedat?: Maybe<Scalars['Float']['output']>;
};

export class Query {
  __typename?: 'Query';
  DeviceHeatSensor!: DeviceHeatSensorObjectType;
};


export class QueryDeviceHeatSensorArgs {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceHeatSensor_QueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeviceHeatSensor_Query = { __typename?: 'Query', DeviceHeatSensor: { __typename?: 'DeviceHeatSensorObjectType', id: number, temperature?: number | null, updatedat?: number | null } };

export const DeviceHeatSensor_QueryDocument = gql`
    query DeviceHeatSensor_query($id: String) {
  DeviceHeatSensor(id: $id) {
    id
    temperature
    updatedat
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeviceHeatSensor_QueryGQL extends Apollo.Query<DeviceHeatSensor_Query, DeviceHeatSensor_QueryVariables> {
    override document = DeviceHeatSensor_QueryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
