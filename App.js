import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import hangmanReducer from './redux/reducer';
import HangmanComponent from './components/HangmanComponent';

const store = configureStore({
  reducer: hangmanReducer,
});

export default function App() {
  return (
    <Provider store={store}>
      <HangmanComponent />
    </Provider>
  );
}