import * as React from 'react';
import Notice from 'src/mother/notice/domain/model/Notice';

interface Props {
  notice: Notice
}

const NoticeDetail: React.FC<Props> = ({ notice }) =>
  <div>
    {JSON.stringify(notice)}
  </div>

export default NoticeDetail;