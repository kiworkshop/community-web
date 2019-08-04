import { getNoticeAPI } from 'lib/api/mother/notice'
import INoticeResponseDto from 'lib/api/mother/notice/dto/INoticeResponse';
import * as React from 'react';
import NoticeDetail from 'ui/components/organisms/NoticeDetail';

const NoticeDetailContainer: React.FC = () => {
  const [notice, setNotice] = React.useState({
    "id": -1,
    "title": "",
    "content": ""
  } as INoticeResponseDto);

  React.useEffect(() => {
    getNoticeAPI(1).then(n => setNotice(n));
  }, [])

  return <NoticeDetail notice={notice} />;
}

export default NoticeDetailContainer;