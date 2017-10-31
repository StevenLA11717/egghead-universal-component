import React from 'react'
import universal from 'react-universal-component'
import { connect } from 'react-redux'
import Loading from './Loading'
import { selectTab } from '../actions/tabs'
import { getSelectedTab } from '../reducers/tabs'
import './App.css'

const LazyTab = universal(({ tab }) => import(`./${tab}`), {
  minDelay: 500,
  alwaysDelay: true,
  loadingTransition: false,
  onLoad(module, info, props, context) {
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
})

class App extends React.Component {
  state = { loading: false }

  loadStart = () => this.setState({ loading: true })

  loadEnd = () => this.setState({ loading: false })

  render() {
    const { selected, selectTab } = this.props;

    return (
      <div>
        { this.state.loading && <Loading /> }
        <div className={ this.state.loading ? 'loading' : '' }>
          <LazyTab
            tab={ selected }
            onBefore={ this.loadStart }
            onAfter={ this.loadEnd }
          />
        </div>

        { ['Home', 'Foo', 'Bar'].map((tab, i) =>
          <button
            key={ i }
            onClick={ () => selectTab(tab) }
          >
            { tab }
          </button>) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selected: getSelectedTab(state)
})

const mapDispatchToProps = { selectTab }

export default connect(mapStateToProps, mapDispatchToProps)(App)
