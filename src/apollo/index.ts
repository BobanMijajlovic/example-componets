import {createHttpLink}   from 'apollo-link-http'
import {ApolloClient}     from 'apollo-client'
import {InMemoryCache}    from 'apollo-cache-inmemory'
import {
  getAccessToken,
  isUseAccessToken,
  setAccessToken
}                         from './accessToken'
import {
  ApolloLink,
  Observable
}                         from 'apollo-link'
import jwtDecode          from 'jwt-decode'
import {TokenRefreshLink} from 'apollo-link-token-refresh'

const cache = new InMemoryCache()

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
    // uri: 'http://192.168.1.15:4000/graphql',
  credentials: 'include'
})

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle : any
    Promise.resolve(operation)
      .then(operation => {
        if (!isUseAccessToken) {
          return
        }
        const accessToken = getAccessToken()
        if (accessToken) {
          operation.setContext({
            headers: {
              authorization: `bearer ${accessToken}`
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) {
        handle.unsubscribe()
      }
    }
  }))

export const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'token',
      isTokenValidOrUndefined: () => {
        if (!isUseAccessToken()) {
          return true
        }
        const token = getAccessToken()
        if (!token) {
          return false
        }
        try {
          const {exp} = jwtDecode(token)
          if (Date.now() >= exp * 1000) {
            return false
          } else {
            return true
          }
        } catch {
          return false
        }
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh_token', {
          credentials: 'include'
        })
      },
      handleFetch: (accessToken : any) => {
        setAccessToken(accessToken)
      },
      handleError: err => {
        console.warn('Your refresh token is invalid. Try to relogin', err)
        console.error(err)
      }
    }),
    requestLink,
    link
  ]),
  cache
})
