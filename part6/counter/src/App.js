import logo from './logo.svg';
import './App.css';
import { legacy_createStore as createStore } from 'redux'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {
  return (
  <div>
    <div>
      {store.getState()}
    </div>
    <button
      onClick={e => store.dispatch({ type: 'INCREMENT' })}
    >
      plus
    </button>
    <botton
      onClick={e => store.dispatch({ type: 'DECREMENT' })}
    >
      minus
    </botton>
    <botton
      onClick={e => store.dispatch({ type: 'ZERO' })}
    >
      zero
    </botton>
  </div>
  );
}

export default App;
