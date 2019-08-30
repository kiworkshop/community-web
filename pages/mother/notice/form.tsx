import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import Long from 'src/common/domain/Long';
import NextPage from 'src/common/domain/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeFormContainer from "src/mother/notice/presentation/containers/NoticeFormContainer";
import { fetchInitialNotice, setPendingFalse } from 'src/mother/notice/presentation/state-module/form';

const NoticeFormPage: NextPage = () => {
  const router = useRouter();
  const id = new Long(String(router.query.id));

  if (id.isNaN()) {
    return <NoticeFormContainer isEditing={false} />;
  }

  return <NoticeFormContainer id={id} isEditing={true} />;
}

NoticeFormPage.getInitialProps = async ({ store, query }: { store: Store<RootState> } & NextPageContext) => {
  if (query.id && store.getState().mother.notice.form.initialNoticeFormDto.title === "") {
    store.dispatch(fetchInitialNotice({ id: new Long(String(query.id)) }));
  } else {
    store.dispatch(setPendingFalse());
  }

  return {
    namespacesRequired: ['common', 'mother', 'noti']
  }
}

export default connect(state => state)(NoticeFormPage);
