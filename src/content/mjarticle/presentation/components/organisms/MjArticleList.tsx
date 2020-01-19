import { Add } from '@material-ui/icons';
import * as React from 'react';
import Page from 'src/common/domain/model/Page';
import I18NService from 'src/common/domain/service/I18NService';
import MyTable from "src/common/presentation/components/atmos/MyTable";
import Spacer from 'src/common/presentation/components/atmos/Spacer';
import ErrorTypography from 'src/common/presentation/components/atmos/typographies/ErrorTypography';
import MySpeedDial, { SpeedDialActionData } from 'src/common/presentation/components/molecules/MySpeedDial';
import { MjArticle } from 'src/content/mjarticle/domain/model/MjArticle';
import { createLinkClickHandler } from 'src/util/createLinkClickHandler';

interface Props {
  page: Page<MjArticle>
  pending: boolean
  rejected: boolean
}

const { useTranslation } = I18NService;

const onRowClick = (e?: React.MouseEvent, data?: MjArticle) => {
  if (!e || !data) {
    return;
  }

  createLinkClickHandler(
    `/mother/mj-article/detail?id=${data.id}`,
    `/mother/mj-article/${data.id}`,
  )(e)
}

const MjArticleDetail: React.FC<Props> = ({ page, pending, rejected }) => {
  const { t } = useTranslation(['common', 'content']);

  const actions: SpeedDialActionData[] = [{
    icon: <Add />,
    name: t('common:add'),
    handleClick: createLinkClickHandler("/mother/mjArticle/form", "/mother/mjArticle/add")
  }]


  return <div>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
      <Spacer />
    </ErrorTypography>

    <MyTable<MjArticle>
      isLoading={pending}
      style={{ boxShadow: '0px 0px 0px 5px rgba(0,0,0,0.03)' }}
      data={page.content}
      columns={[
        { title: "ID", field: "id" },
        { title: t("mother:mjArticle.title"), field: "title" },
      ]}
      title={t("common:mjArticle")}
      onRowClick={onRowClick}
      options={{
        initialPage: 3,
      }}
    />

    <MySpeedDial actions={actions} />
  </div>
}

export default MjArticleDetail;