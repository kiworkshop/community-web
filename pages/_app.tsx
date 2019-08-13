import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import createSagaMiddleware from "@redux-saga/core";
import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider as ReduxStoreProvider } from "react-redux";
import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import theme from 'src/common/presentation/components/theme';
import CmsLayoutContainer from 'src/common/presentation/container/templates/CmsLayoutContainer';
import { setFirstDepthPath, setPaths } from 'src/common/presentation/state-module/common';
import { rootReducer, rootSaga, RootState } from 'src/common/presentation/state-module/root';

const makeStore = (preloadedState = {} as RootState) => {
  const bindMiddleware = (middlewares: Middleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      const { createLogger } = require('redux-logger');
      return composeWithDevTools(applyMiddleware(createLogger(), ...middlewares))
    }
    return applyMiddleware(...middlewares)
  }

  const sagaMiddleware = createSagaMiddleware();

  const reduxStore: Store<RootState, AnyAction> = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware])
  );

  (reduxStore as any).sagaTask = sagaMiddleware.run(rootSaga);

  return reduxStore
};

const getFirstDepthPath = (pathname: string): FirstDepthPath => {
  const to = pathname.indexOf("/", 1);
  if (to < 0) {
    return pathname as FirstDepthPath
  }

  return pathname.substr(0, to) as FirstDepthPath
}

interface AppProps {
  store: Store<RootState>
}

class MyApp extends App<AppProps> {
  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps, store, router } = this.props;
    store.dispatch(setFirstDepthPath({ firstDepthPath: getFirstDepthPath(router.pathname) }))
    store.dispatch(setPaths({ pathname: router.pathname }))

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <ReduxStoreProvider store={store}>
            <CmsLayoutContainer>
              <Component {...pageProps} />
            </CmsLayoutContainer>
          </ReduxStoreProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga(MyApp))