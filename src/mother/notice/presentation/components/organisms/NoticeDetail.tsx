import { Card, CardContent, Theme } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import { createLinkClickHandler } from 'src/common/presentation/components/atmos/createLinkClickHandler';
import ImmutableTextField from 'src/common/presentation/components/atmos/ImmutableTextField';
import MarkdownPreview from 'src/common/presentation/components/atmos/previews/MarkdownPreview';
import ErrorTypography from 'src/common/presentation/components/atmos/typographies/ErrorTypography';
import MySpeedDial, { SpeedDialActionData } from 'src/common/presentation/components/molecules/MySpeedDial';
import inversifyServices from 'src/inversifyServices';
import Notice from 'src/mother/notice/domain/Notice';

interface Props {
  notice: Notice
  pending: boolean
  rejected: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  semiTransparent: {
    opacity: 0.5
  },
  flex: {
    display: 'flex'
  },
  cardContainer: {
    margin: 10
  },
  card: {
    width: 600
  }
}))


const { useTranslation } = inversifyServices.common.i18NService;

const NoticeDetail: React.FC<Props> = ({ notice, pending, rejected }) => {
  const classes = useStyles();
  const { t } = useTranslation(["mother", "common"]);
  const actions: SpeedDialActionData[] = [
    {
      icon: <Edit />,
      name: t('common:edit'),
      handleClick: createLinkClickHandler(
        `/mother/notice/form?id=${notice.id}`,
        `/mother/notice/edit/${notice.id}`,
      )
    },
    { icon: <Delete />, name: t('common:delete'), handleClick: () => { alert('hi') } },
  ];
  const [previewWidth] = React.useState(320);


  const { id, title, content } = notice;
  return <>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
    </ErrorTypography>

    <div className={clsx({
      [classes.semiTransparent]: pending || rejected
    })}>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <ImmutableTextField label="ID" value={id} fullWidth />
            <div className={classes.spacing} />
            <ImmutableTextField label={t("notice.title")} value={title} fullWidth />
          </CardContent>
        </Card>
      </div>
      <div className={classes.cardContainer}>
        <Card style={{ width: previewWidth }}>
          <CardContent>
            <MarkdownPreview markdown={content} />
          </CardContent>
        </Card>
      </div>
    </div>
    <MySpeedDial actions={actions} />
  </>
}

export default NoticeDetail;