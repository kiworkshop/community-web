import * as React from 'react';
import Notice from '../../domain/model/Notice';
import NoticeDetail from '../components/organisms/NoticeDetail';

const NoticeDetailContainer: React.FC = () => {
  const [notice] = React.useState(Notice.builder()
    .id(-1)
    .title("title")
    .content("content").build()
  );

  return <NoticeDetail notice={notice} />;
}

export default NoticeDetailContainer;