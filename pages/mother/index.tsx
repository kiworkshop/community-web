import { NextPageContext } from 'next';
import Router from 'next/router';
import NextPage from 'src/common/domain/model/NextPage';

const MotherPage: NextPage = () => <></>;

MotherPage.getInitialProps = async ({ res }: NextPageContext) => {
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