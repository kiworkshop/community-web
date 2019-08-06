import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import createSagaMiddleware from "@redux-saga/core";
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider as ReduxStoreProvider } from "react-redux";
import { AnyAction, applyMiddleware, createStore, Store, StoreEnhancer } from 'redux';
import theme from 'src/common/presentation/components/theme';
import { rootReducer, rootSaga, RootState } from 'src/common/presentation/state-module/root';

const store = (() => {
  const sagaMiddleware = createSagaMiddleware();

  let reduxStore: Store<RootState, AnyAction>;
  if (process.env.NODE_ENV === "development") {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { createLogger } = require('redux-logger');

    const logger = createLogger();
    reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));
  } else {
    reduxStore = createStore(rootReducer, applyMiddleware(sagaMiddleware) as StoreEnhancer<Store<RootState, AnyAction>, RootState>);
  }

  sagaMiddleware.run(rootSaga);

  return reduxStore
})();

export default class MyApp extends App {
  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <ReduxStoreProvider store={store}>
            <Component {...pageProps} />
          </ReduxStoreProvider>

        </ThemeProvider>
      </Container>
    );
  }
}