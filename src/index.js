import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from '@store'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './style.scss'

const client = new ApolloClient({
  // Provide required constructor fields
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),

  // Provide some optional constructor fields
  // name: 'react-web-client',
  // version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})

const MainApp = () => {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
    // </React.StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<MainApp />)
