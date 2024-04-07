import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Employee from './employee';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Employee />
      </div>
    </Provider>
  );
}

export default App;