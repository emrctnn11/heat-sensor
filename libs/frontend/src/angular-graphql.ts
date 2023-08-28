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
  ID: { input: string; output: string; } | undefined
  String!: { input: string; output: string; };
  Boolean!: { input: boolean; output: boolean; };
  Int!: { input: number; output: number; };
  Float!: { input: number; output: number; };
};

export class DeviceHeatSensorObjectType {
  __typename?: 'DeviceHeatSensorObjectType';
  id!: Scalars['Float']['output'];
  temperature!: Scalars['Float']['output'];
  updatedat!: Scalars['Float']['output'];
};

export class Query {
  __typename?: 'Query';
  AllDevices!: Array<DeviceHeatSensorObjectType>;
};

export type AllDevices_QueryVariables = Exact<{ [key: string]: never; }>;


export type AllDevices_Query = { __typename?: 'Query', AllDevices: Array<{ __typename?: 'DeviceHeatSensorObjectType', id: number, temperature: number, updatedat: number }> };

export const AllDevices_QueryDocument = gql`
    query AllDevices_query {
  AllDevices {
    id
    temperature
    updatedat
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllDevices_QueryGQL extends Apollo.Query<AllDevices_Query, AllDevices_QueryVariables> {
    override document = AllDevices_QueryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
