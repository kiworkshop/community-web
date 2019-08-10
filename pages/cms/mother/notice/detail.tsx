import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeDetailContainer from "src/mother/notice/presentation/containers/NoticeDetailContainer";
import { fetchNotice } from 'src/mother/notice/presentation/state-module/detail';

const NoticePage: React.FC = () => {
  return <NoticeDetailContainer />;
}

(NoticePage as any).getInitialProps = ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().mother.notice.detail.notice.id < 1) {
    store.dispatch(fetchNotice({ id: 1 }));
  }

  return {}
}

export default connect(state => state)(NoticePage);