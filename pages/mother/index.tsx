import { NextPageContext } from 'next';
import Router from 'next/router';

const MotherPage = () => <></>;

(MotherPage as any).getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: '/mother/notice'
    })
    res.end()
  } else {
    Router.push('/mother/notice')
  }
  return {}
}


export default MotherPage;