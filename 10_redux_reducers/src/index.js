import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'
import tabs from './reducers/tabs'

const store = createStore(tabs)

console.log(store);

const render = App => ReactDOM.hydrate(
  <Provider store={ store }>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const App = require('./components/App').default
    render(App)
  })
}

render(App)