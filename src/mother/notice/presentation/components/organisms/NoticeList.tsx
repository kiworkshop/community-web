import * as React from 'react';
import Page from 'src/common/domain/Page';
import { createLinkClickHandler } from 'src/common/presentation/components/atmos/createLinkClickHandler';
import MyTable from "src/common/presentation/components/atmos/MyTable";
import ErrorTypography from 'src/common/presentation/components/atmos/typographies/ErrorTypography';
import inversifyServices from 'src/inversifyServices';
import Notice from 'src/mother/notice/domain/Notice';

interface Props {
  page: Page<Notice>
  pending: boolean
  rejected: boolean
}

const { useTranslation } = inversifyServices.common.i18NService;

const onRowClick = (e?: React.MouseEvent, data?: Notice) => {
  if (!e || !data) {
    return;
  }

  createLinkClickHandler(
    `/mother/notice/detail?id=${data.id}`,
    `/mother/notice/${data.id}`,
  )(e)
}

const NoticeDetail: React.FC<Props> = ({ page, pending, rejected }) => {
  const { t } = useTranslation(['common', 'mother']);
  return <div>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
    </ErrorTypography>
    <MyTable<Notice>
      isLoading={pending}
      style={{ boxShadow: '0px 0px 0px 5px rgba(0,0,0,0.03)' }}
      data={page.content}
      columns={[
        { title: "ID", field: "id" },
        { title: t("mother:notice.title"), field: "title" },
        { title: t("mother:notice.content"), field: "content" },
      ]}
      title={t("notice")}
      onRowClick={onRowClick}
      options={{
        initialPage: 3,
      }}
    />
  </div>
}

export default NoticeDetail;