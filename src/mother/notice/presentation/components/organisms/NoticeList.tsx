import * as React from 'react';
import Page from 'src/common/domain/model/Page';
import MyTable from "src/common/presentation/components/atmos/MyTable";
import Notice from 'src/mother/notice/domain/model/Notice';

interface Props {
  page: Page<Notice>
  pending: boolean
  rejected: boolean
}

const NoticeDetail: React.FC<Props> = ({ pending, rejected }) =>
  <div style={{ opacity: pending ? 0.5 : 'initial' }}>
    <MyTable />

    {/* {JSON.stringify(page)} */}
    <br />
    pending: {JSON.stringify(pending)}
    <br />
    rejected: {JSON.stringify(rejected)}
  </div>

export default NoticeDetail;