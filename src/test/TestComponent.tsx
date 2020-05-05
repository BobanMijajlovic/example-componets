import React            from 'react'
import fetch            from 'unfetch'
import {ApolloProvider} from "@apollo/react-hooks";

import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache}  from 'apollo-cache-inmemory'

import ApolloClient from 'apollo-client'

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch: fetch
    }),
    cache: new InMemoryCache(),
})

export interface ITestComponentProps {
    render: any
}

export const TestComponent = ({render: Render}: ITestComponentProps) => {
    return (
        <ApolloProvider client={client}>
            <Render/>
        </ApolloProvider>
    )
}
