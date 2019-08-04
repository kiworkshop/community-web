import * as React from 'react';
import Notice from '../../domain/model/Notice';
import { noticeService } from '../../instances';
import NoticeDetail from '../components/organisms/NoticeDetail';

const NoticeDetailContainer: React.FC = () => {
  const [notice, setNotice] = React.useState(Notice.of({
    "id": -1,
    "title": null as any as string,
    "content": null as any as string
  }));

  React.useEffect(() => {
    noticeService.getNotice(1).then(n => setNotice(n));
  }, [])

  return <NoticeDetail notice={notice} />;
}

export default NoticeDetailContainer;