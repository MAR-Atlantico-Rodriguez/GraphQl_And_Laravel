import {APOLLO_OPTIONS} from 'apollo-angular';
import {NgModule} from '@angular/core';
import {HttpLink} from 'apollo-angular/http';
import { InMemoryCache, ApolloLink} from '@apollo/client/core';
import Echo from "laravel-echo";
import { createLighthouseSubscriptionLink } from "@thekonz/apollo-lighthouse-subscription-link";

const uri = 'http://localhost:8000/graphql'; // <-- add the URL of the GraphQL server here

const echoClient = new Echo({
  broadcaster: 'pusher',
  cluster: 'mt1',
  // host: 'http://localhost:6001',
  key: 'V8mLSxYps2L6TgYacWvW',
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enableTransport: ['ws']
});

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {

        // Create an http link:
        const http = httpLink.create({ uri: uri });

        const link = ApolloLink.from([
          // @ts-ignore: Unreachable code error
          createLighthouseSubscriptionLink(echoClient),
          http, // your existing http link to your graphql api
        ]);

        return {
          link,
          cache: new InMemoryCache(),
          // ... options
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
