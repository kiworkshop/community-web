import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { inversifyContainer } from 'inversify.config';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { inversifyIds } from 'src/inversify.id';
import NoticeService from 'src/mother/notice/domain/service/NoticeService';
import theme from '../src/common/presentation/components/theme';

export const singletons = {
  cms: {
    mother: {
      notice: {
        service: inversifyContainer.get<NoticeService>(inversifyIds.mother.notice.NoticeService)
      }
    }
  }
}

class MyApp extends App {
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
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
