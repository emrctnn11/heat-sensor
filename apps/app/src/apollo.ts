import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';

export const environment = {
  production: false,
  graphql: 'http://localhost:3000/graphql',
  graphqlws: 'ws://localhost:3000/graphql',
};

const httpLink = new HttpLink({
  uri: environment.graphql, // Replace with your GraphQL API endpoint
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
