import * as React from 'react';
import Page from 'src/common/domain/model/Page';
import MyTable from "src/common/presentation/components/atmos/MyTable";
import inversifyServices from 'src/inversifyServices';
import Notice from 'src/mother/notice/domain/model/Notice';

interface Props {
  page: Page<Notice>
  pending: boolean
  rejected: boolean
}

const { useTranslation } = inversifyServices.common.i18NService;

const NoticeDetail: React.FC<Props> = ({ page, pending, rejected }) => {
  const { t } = useTranslation(['common', 'mother']);
  return <div style={{ opacity: pending ? 0.5 : 'initial' }}>
    <MyTable<Notice>
      style={{ boxShadow: '0px 0px 0px 5px rgba(0,0,0,0.03)' }}
      data={page.content}
      columns={[
        { title: "ID", field: "id" },
        { title: t("mother:notice.title"), field: "title" },
        { title: t("mother:notice.content"), field: "content" },
      ]}
      title={t("notice")}
    />

    <br />
    pending: {JSON.stringify(pending)}
    <br />
    rejected: {JSON.stringify(rejected)}
  </div>
}

export default NoticeDetail;