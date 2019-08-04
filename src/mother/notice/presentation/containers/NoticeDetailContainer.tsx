import { singletons } from "pages/_app";
import * as React from 'react';
import Notice from '../../domain/model/Notice';
import NoticeDetail from '../components/organisms/NoticeDetail';

const noticeService = singletons.cms.mother.notice.service;

const NoticeDetailContainer: React.FC = () => {
  const [notice, setNotice] = React.useState(Notice.builder()
    .setId(-1)
    .setTitle("title")
    .setContent("content").build()
  );

  React.useEffect(() => {
    noticeService.getNotice(1).then(n => setNotice(n));
  }, [])

  return <NoticeDetail notice={notice} />;
}

export default NoticeDetailContainer;