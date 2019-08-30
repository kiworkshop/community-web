import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Error from 'pages/_error'
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeDetailContainer from "src/mother/notice/presentation/containers/NoticeDetailContainer";
import { fetchNotice } from 'src/mother/notice/presentation/state-module/detail';

const NoticeDetailPage: NextPage = () => {
  const router = useRouter();
  const { id: idString } = router.query;

  const id = Number(idString);

  if (isNaN(id)) {
    return <Error statusCode={400} />
  }

  return <NoticeDetailContainer id={id} />;
}

NoticeDetailPage.getInitialProps = async ({ store, query }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().mother.notice.detail.notice.id < 1) {
    store.dispatch(fetchNotice({ id: Number(query.id) }));
  }

  return {
    namespacesRequired: ['common', 'mother', 'noti']
  }
}

export default connect(state => state)(NoticeDetailPage);