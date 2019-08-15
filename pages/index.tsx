import { NextPageContext } from 'next';
import Router from 'next/router';
import React from 'react';

const MainPage = () => <></>;

(MainPage as any).getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: '/mother'
    })
    res.end()
  } else {
    Router.push('/mother')
  }
  return {}
}

export default MainPage