import { NextPageContext } from 'next';
import Router from 'next/router';
import * as React from 'react';

const ContentPage = () => <></>;

(ContentPage as any).getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: '/content/board'
    })
    res.end()
  } else {
    Router.push('/content/board')
  }
  return {}
}

export default ContentPage