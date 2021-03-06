import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import { isBrowser } from './isBrowser';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

/**
 * httpLink 설정시에 credentials 를 반드시 설정해 주어야 한다.
 * 설정해주지 않았을 경우 apollo서버에서 보내주는
 * 세션에 대한 response cookie 를 클라이언트에서 굽지 못한다.
 */
function create(initialState: any, { getToken }: Options) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
    // 종류: omit(생략), include(다른 도메인일 경우), same-origin(같은 도메인일 경우)
    //credentials: 'same-origin'
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : ''
        //authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
