import INoticeResponseDto from 'lib/api/mother/notice/dto/INoticeResponse';
import * as React from 'react';

interface IProps {
  notice: INoticeResponseDto
}

const NoticeDetail: React.FC<IProps> = ({ notice }) =>
  <div>
    {JSON.stringify(notice)}
  </div>

export default NoticeDetail;