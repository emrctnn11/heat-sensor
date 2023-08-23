import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule as ApolloClientModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { split } from '@apollo/client/core';
import { WebSocketLink } from './graphql-ws.socket';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client';
import { environment } from './environments/environment';

const promiseToObservable = (promise: Promise<any>) =>
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) {
          return;
        }
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err)
    );
  });

@NgModule({
  exports: [HttpClientModule, ApolloClientModule],
  providers: [HttpLink, ApolloClientModule],
})
export class ApolloModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({
      uri: environment.graphql,
    });

    const ws = new WebSocketLink({
      url: environment.graphqlws,
      retryAttempts: 5,
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ws,
      http
    );

    const links = ApolloLink.from([link]);
    apollo.create({
      link: links,
      cache: new InMemoryCache(),
      // other options like cache
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        },
        query: {
          fetchPolicy: 'no-cache',
        },
      },
    });
  }
}
