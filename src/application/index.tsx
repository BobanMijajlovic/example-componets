import React, {useEffect} from 'react'
import '../assets/css/app/index.css'
import AuthLayout         from './layout/auth/index'
import {Switch}           from 'react-router-dom'
import {
  Route,
  RouteComponentProps,
  withRouter
}                         from 'react-router'
import {
  ApolloProvider,
  useApolloClient
}                         from '@apollo/react-hooks'
import MainLayout         from './layout/main'

import {client}              from '../apollo'
import {useApplicationState} from './hooks/useApplicationState'
import ApolloAsyncCall       from '../graphql/ApolloAsyncCallClass'

const Component = withRouter((props : RouteComponentProps) => {

  const {setStateRedirectLink, redirectLink} = useApplicationState()
  const client = useApolloClient()
  ApolloAsyncCall.apolloClient = client

  useEffect(() => {
    if (!redirectLink.link || redirectLink.processed) {
      return
    }
    setStateRedirectLink(false)
    props.history.replace(redirectLink.link)
  }, [redirectLink.link])

  return (
    <div className={'hw-app-main'}>
      <Switch>
        <Route path={'/application/auth'}> <AuthLayout/></Route>
        <Route path={'/application/main'}> <MainLayout/></Route>
      </Switch>
    </div>
  )
})

const Application = () => {

  return (
    <ApolloProvider client={client}>
      <Component/>
    </ApolloProvider>
  )
}

export default withRouter(Application)
