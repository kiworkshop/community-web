import * as React from 'react';
import Notice from 'src/mother/notice/domain/Notice';

interface Props {
  notice: Notice
  pending: boolean
  rejected: boolean
}

const NoticeDetail: React.FC<Props> = ({ notice, pending, rejected }) =>
  <div style={{ opacity: pending ? 0.5 : 'initial' }}>
    {JSON.stringify(notice)}
    <br />
    pending: {JSON.stringify(pending)}
    <br />
    rejected: {JSON.stringify(rejected)}
  </div>

export default NoticeDetail;